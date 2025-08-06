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
    // 1. Update consultant status
    await client.query(
      `UPDATE user_details SET consultant_status = 'Active' WHERE user_id = $1`,
      [member.user_id]
    );

    // 2. Insert into project_members
    await client.query(
      `INSERT INTO project_members (project_id, user_id, role)
       VALUES ($1, $2, $3)`,
      [projectId, member.user_id, member.role]
    );

    // 3. Safely increment no_oppurtunity
    const result = await client.query(
      `SELECT no_oppurtunity FROM user_details WHERE user_id = $1`,
      [member.user_id]
    );

    if (result.rows.length > 0) {
      const currentValue = result.rows[0].no_oppurtunity || 0;
      await client.query(
        `UPDATE user_details SET no_oppurtunity = $1 WHERE user_id = $2`,
        [currentValue + 1, member.user_id]
      );
    } else {
      console.error(`❌ User not found with ID: ${member.user_id}`);
      throw new Error(`User not found with ID: ${member.user_id}`);
    }
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
