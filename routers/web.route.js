import express from "express";  
import { getWeb, getwebId } from "../controllers/web.controller.js";
const router = express.Router();    
router.get("/",getWeb);
router.get("/:id",getwebId);
export default router;  