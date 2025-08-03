import use from '@tensorflow-models/universal-sentence-encoder';
import tf from '@tensorflow/tfjs';
import pool from '../db.js';
// const pool = require('./db'); // PostgreSQL pool connection
let model = null;

// Load the model only once
const loadModel = async () => {
  if (!model) {
    model = await use.load();
  }
};

// Function to get embeddings
const getQueryEmbedding = async (query) => {
  await loadModel();
  const embeddings = await model.embed([query]);
  return embeddings.arraySync()[0];
};

// Cosine similarity
const cosineSimilarity = (vec1, vec2) => {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const norm1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const norm2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (norm1 * norm2);
};

 const search = async (req, res) => {
  try {
    const { query } = req.body;
    const queryLower = query.toLowerCase();

    // Try exact name/email match
    const exactMatch = await pool.query(
      "SELECT * FROM user_details WHERE LOWER(name) = $1 OR LOWER(email) = $1",
      [queryLower]
    );
    if (exactMatch.rows.length > 0) {
      return res.json({ results: exactMatch.rows });
    }

    // Else, perform semantic embedding search
    const queryEmbedding = await getQueryEmbedding(query);

    const users = await pool.query("SELECT * FROM user_details");
    const ranked = users.rows.map((user) => {
      const similarity = cosineSimilarity(queryEmbedding, user.embedding);
      return { ...user, similarity };
    });

    const sorted = ranked.sort((a, b) => b.similarity - a.similarity);
    res.json({ results: sorted.slice(0, 5) }); // top 5 results
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};
export default search;