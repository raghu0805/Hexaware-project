import express from "express";
const router = express.Router();
import  search  from "../controllers/searchController.js";

router.post("/search", search);

export default router;
