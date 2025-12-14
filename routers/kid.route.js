import express from "express";  
import { getKidId, getKids } from "../controllers/kid.controller.js";
const router = express.Router();    
router.get("/",getKids);
router.get("/:id",getKidId);
export default router;  