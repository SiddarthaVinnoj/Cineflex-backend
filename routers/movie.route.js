import express from "express";  
import { getMovie, getMovieId } from "../controllers/movie.controller.js";
const router = express.Router();    
router.get("/",getMovie);
router.get("/:id",getMovieId)
export default router;  