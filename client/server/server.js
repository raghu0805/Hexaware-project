import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { execFile } from 'child_process';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import searchRoutes from './routes/search.js'
// ✅ Use shared connection pool
import pool from './db.js'; // or wherever your pool.js file is
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
origin: ['http://localhost:5173', 'http://localhost:5174'],  credentials: true
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173','http://localhost:5174');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
// app.use("/api", searchRoutes);
app.use("/", searchRoutes);
let currentUserId = null; // Store current user ID in memory
app.post('/consultant-login', async (req, res) => {
  const { email, password } = req.body;
  // Use your DB query logic here
  const result = await pool.query("SELECT * FROM user_details WHERE email = $1 AND password = $2", [email, password]);
  if (result.rows.length > 0) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Wrong email or password" });
  }
});
// Registration endpoint
app.post('/register', async (req, res) => {
  console.log(req.body)
  const { name, email, phone, password } = req.body;
  const countRes = await pool.query("SELECT COUNT(*) FROM user_details");
  let totalUsers = parseInt(countRes.rows[0].count) + 1;
  currentUserId = `Consultant${100 + totalUsers}`;
  try {
    await pool.query(
      "INSERT INTO user_details (name, email, phone, user_id,password) VALUES ($1, $2, $3, $4,$5)",
      [name, email, phone, currentUserId, password]
    );
    console.log("User Registered:", currentUserId);
    res.json({ message: "Registered Successfully", user_id: currentUserId });
  } catch (err) {
    console.error("pool Insert Error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});
// Send registered user data to frontend
app.get("/api/user", async (req, res) => {
  const result = await pool.query("SELECT * FROM user_details WHERE user_id = $1", [currentUserId]);
  res.json(result.rows);
});
app.get("/api/userdetails/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM user_details WHERE user_id = $1", [userId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const fullName = uniqueSuffix + ext;
    console.log("Saving file as:", fullName);
    cb(null, fullName);
  }
});

const upload = multer({ storage }); // ✅ Use your custom storage


// Resume upload and processing
app.post("/upload", upload.single("resume"), (req, res) => {
  // const resumePath = path.join(__dirname, req.file.path);
  const uploadedFileName = req.file.filename; // This includes the extension like .pdf
  const resumePath = path.join(__dirname, 'uploads', uploadedFileName);

  console.log("Resume path sent to Python:", resumePath); // ✅ Add this


  execFile("python3", ["resumeProcessor.py", resumePath], async (error, stdout, stderr) => {
    if (error) {
      console.error("Python Error:", error.message);
      return res.status(500).json({ error: "Processing failed" });
    }

    try {
      const result = JSON.parse(stdout);
      const { skills, embedding } = result;

      // ✅ Print extracted data
      console.log("Extracted Skills:", skills);
      console.log("Generated Embedding:", embedding);

      // ✅ Update current user record with skills and embedding
      await pool.query(
        "UPDATE user_details SET skills = $1, embedding = $2 WHERE user_id = $3",
        [skills, embedding, currentUserId]
      );

      res.status(200).json({ message: "Resume processed", skills, embedding });
    } catch (parseError) {
      console.error("Parse Error:", parseError.message);
      return res.status(500).json({ error: "Invalid output from resumeProcessor.py" });
    }
  });
});


//? routes/searchBySkill.js
app.get("/search-by-skill", async (req, res) => {
  const skill = req.query.skill.toLowerCase();

  const result = await pool.query(
    "SELECT * FROM user_details WHERE LOWER(skills::text) LIKE $1",
    [`%${skill}%`]
  );

  res.json(result.rows);
});
app.post("/search-by-skill", async (req, res) => {
  const { query } = req.body; // ✅ Expect `query` from body
  const skill = query.toLowerCase(); // ✅ Convert to lowercase for LIKE match

  try {
    const result = await pool.query(
      `SELECT * FROM user_details 
       WHERE LOWER(array_to_string(skills, ',')) LIKE $1 
          OR LOWER(name) LIKE $1 
          OR LOWER(email) LIKE $1`,
      [`%${skill}%`]
    );

    res.json({ results: result.rows }); // ✅ Must return as { results: [...] }
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

//?api/mark-attendance
app.post("/api/mark-attendance", async (req, res) => {
  const { user_id } = req.body;
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours < 9 || (hours === 9 && minutes > 30)) {
    return res.status(400).json({ error: "Cannot mark attendance after 9:30 AM" });
  }

  const date = now.toISOString().split("T")[0];

  try {
    // Check if already marked
    const existing = await pool.query(
      "SELECT * FROM attendance WHERE user_id = $1 AND date = $2",
      [user_id, date]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Attendance already marked for today" });
    }

    // Insert attendance
    await pool.query(
      "INSERT INTO attendance(user_id, date, time) VALUES ($1, $2, $3)",
      [user_id, date, now.toTimeString().split(" ")[0]]
    );

    res.json({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
app.get("/consultants", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user_details");
    res.json({ results: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch consultants" });
  }
});
app.get("/onbench", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user_details WHERE consultant_status = 'bench'");
    res.json({ results: result.rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch on-bench consultants" });
  }
});

app.get("/active", async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM user_details WHERE consultant_status = 'Active'"
    );
    res.json({ results: results.rows });
  } catch (error) {
    console.error("Error fetching active consultants:", error.message);
    res.status(500).json({ error: "Failed to fetch active consultants" });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});