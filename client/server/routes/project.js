import express from "express";
import pkg from "pg";
import { v4 as uuidv4 } from "uuid";

const { Pool } = pkg;
const router = express.Router();
import pool from "../db.js";

router.post("/create-project", async (req, res) => {
  const { projectType, project_name, duration, team } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const projectId = uuidv4();
    const startDate = new Date(); // today
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + duration * 7); // add X weeks

    const insertProjectQuery = `
      INSERT INTO project_details 
      (project_id, project_name, project_type, duration_weeks, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await client.query(insertProjectQuery, [
      projectId,
      project_name,
      projectType,
      duration,
      startDate.toISOString().split("T")[0],
      endDate.toISOString().split("T")[0],
    ]);

    for (const member of team) {
      if (member.user_id) {
        await client.query(
          `update user_details set consultant_status='Active' where user_id=$1`,[member.user_id]
        );
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
