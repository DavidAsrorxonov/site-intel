import { generateToken } from "../helper/gen-token.js";
import User from "../models/Users.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await brcypt.hash(
      password,
      await bcrypt.genSalt(10),
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    console.log("Error in register controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
