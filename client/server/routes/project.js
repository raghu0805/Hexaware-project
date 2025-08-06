import express from "express";
import pkg from "pg";
import { v4 as uuidv4 } from "uuid";

const { Pool } = pkg;
const router = express.Router();

// Import the existing pool from db.js (you must also convert db.js to ES module if needed)
import pool from "../db.js";

router.post("/create-project", async (req, res) => {
  const { projectType, duration, team } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const projectId = uuidv4(); // store as TEXT

    const insertProjectQuery = `
      INSERT INTO project_details (project_id, project_type, duration_weeks)
      VALUES ($1, $2, $3)
    `;
    await client.query(insertProjectQuery, [projectId, projectType, duration]);

    for (const member of team) {
      if (member.user_id) {
        await client.query(
          `INSERT INTO project_members (project_id, user_id, role)
           VALUES ($1, $2, $3)`,
          [projectId, member.user_id, member.role]
        );
      }
    }

    await client.query("COMMIT");
    res.status(201).json({ message: "✅ Project created successfully", projectId });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  } finally {
    client.release();
  }
});

export default router;
