import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

export const signup = async(req, res)=>{
    try {
      const {fullname, email, password} = req.body;
      const user = await  User.findOne({email})
      if(user){
        return res.status(400).json({message:"User already exists"})
      }
      const hashPassword = await bcryptjs.hash(password,10)
      // Debug logs for admin key troubleshooting
      console.log("ADMIN_KEY (env):", process.env.ADMIN_KEY);
      console.log("x-admin-key (header):", req.headers["x-admin-key"]);
      // allow admin creation only when correct admin key is provided in header
      const adminKey = process.env.ADMIN_KEY || "dev_admin_key";
      const isAdmin = req.headers["x-admin-key"] === adminKey;

      const createdUser = new User({
        fullname : fullname,
        email : email,
        password : hashPassword,
        isAdmin: isAdmin
      });
      await createdUser.save()
      
      res.status(201).json({message:"Signup successfull", isAdmin});
    } catch (error) {
      console.log(error.message)
      res.status(500).json({message:"INternal server error"})
    }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const secret = process.env.JWT_SECRET || "dev_jwt_secret";
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secret, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const seedAdmin = async (req, res) => {
  try {
    const { fullname, email, password, adminKey } = req.body;
    const expected = process.env.ADMIN_KEY || "dev_admin_key";
    if (adminKey !== expected) return res.status(403).json({ message: "Invalid admin key" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcryptjs.hash(password, 10);
    const adminUser = new User({ fullname, email, password: hashPassword, isAdmin: true });
    await adminUser.save();
    res.status(201).json({ message: "Admin user created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
