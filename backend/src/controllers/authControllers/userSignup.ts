import { RequestHandler } from "express";
import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";

export const userSignup: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      res.status(400).json({ message: "Name, email and password are required" });
      return;
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        message: "User already exists!",
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    console.log("User created !!");

    res.status(201).json({
      message: "User signed up!",
    });
  } catch (e) {
    console.error("Signup error:", e);
    res.status(500).json({
      message: "Internal server error!",
      error: e instanceof Error ? e.message : e,
    });
  }
};

