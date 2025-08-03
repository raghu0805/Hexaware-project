import pool from "../db.js";
import { cosineSimilarity } from "../utils/similarity.js";

export default async function search(req, res) {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "No query provided" });
  }

  try {
    // Fetch all users with embeddings
    const result = await pool.query("SELECT * FROM user_details WHERE embedding IS NOT NULL");
    const users = result.rows;

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Generate embedding for the HR's query
    const embeddingRes = await fetch("http://localhost:11434/api/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "nomic-embed-text",
        prompt: query,
      }),
    });

    const embeddingData = await embeddingRes.json();

    if (!embeddingData || !embeddingData.embedding) {
      console.error("Embedding response:", embeddingData);
      return res.status(500).json({ error: "Search failed", details: "Invalid embedding response" });
    }

    const queryEmbedding = embeddingData.embedding;

    // Score users
    const scoredUsers = users.map(user => ({
      ...user,
      similarity: cosineSimilarity(queryEmbedding, user.embedding)
    }));

    // ✅ Apply threshold filter
    const threshold = 0.6;
    const filteredUsers = scoredUsers.filter(user => user.similarity >= threshold);

    // Sort by similarity
    filteredUsers.sort((a, b) => b.similarity - a.similarity);

    if (filteredUsers.length === 0) {
      return res.status(404).json({ message: "No strong matches found" });
    }

    return res.json(filteredUsers.slice(0, 5)); // Top 5 matches above threshold

  } catch (err) {
    console.error("Search error:", err.stack);
    res.status(500).json({ error: "Search failed", details: err.message });
  }
}
