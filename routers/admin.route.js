import express from "express";
import User from "../model/user.model.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Check current user admin status
router.get("/check-admin", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ 
      email: user.email, 
      isAdmin: user.isAdmin,
      message: user.isAdmin ? "User is admin" : "User is not admin"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Make user admin (temporary - remove after use)
router.post("/make-admin", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.isAdmin = true;
    await user.save();
    res.json({ message: "User is now admin", isAdmin: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
