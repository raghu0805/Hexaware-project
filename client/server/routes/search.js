import express from "express";
const router = express.Router();
import pool from '../db.js'
router.post("/search", async (req, res) => {
   try {
    const { query } = req.body;
    console.log("Received search query:", query);

    const results = await pool.query(
      "SELECT * FROM user_details WHERE LOWER(name) LIKE LOWER($1) OR LOWER(email) LIKE LOWER($1) OR skills ILIKE $1",
      [`%${query}%`]
    );

    if (results.rows.length > 0) {
        console.log("Result:",[results.rows[0]])
return res.json({ results: results.rows }); // ✅ Return all matching users
    } else {
      return res.json({ message: "No strong matches found" });
    }
  } catch (error) {
    console.error("Search error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
