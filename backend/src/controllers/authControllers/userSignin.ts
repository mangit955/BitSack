import { UserModel } from "../../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";

export const userSignin: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
   console.log("Signin request received:", req.body);
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    if (!existingUser.password) {
      res.status(401).json({ message: "Invalid credentials!" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials!" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_PASSWORD || "default_secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
