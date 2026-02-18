import express from "express";  
import { getMovie, getMovieId, createMovie, updateMovie, deleteMovie } from "../controllers/movie.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();    
router.get("/",getMovie);
router.get("/:id",getMovieId)
router.post("/", verifyToken, verifyAdmin, createMovie);
router.put("/:id", verifyToken, verifyAdmin, updateMovie);
router.delete("/:id", verifyToken, verifyAdmin, deleteMovie);
export default router;  