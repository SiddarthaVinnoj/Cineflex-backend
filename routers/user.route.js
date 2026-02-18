import express from "express";
import { signup, login, seedAdmin } from "../controllers/user.controller.js";
const router = express.Router()
router.post("/signup", signup)
router.post("/login",login)
router.post("/seed-admin", seedAdmin)
export default router;