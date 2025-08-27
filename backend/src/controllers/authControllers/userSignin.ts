import { UserModel } from "../../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";

export const userSignin: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      res.status(411).json({
        message: "User not found!",
      });
      return;
    }

    //compared password
    if (!existingUser.password) {
      res.status(411).json({
        message: "Invalid Credentials!",
      });
      return;
    }
    const isPassswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPassswordValid) {
      res.status(411).json({
        message: "Invalid Credentials!",
      });
      return;
    }

    //Sign with JWT

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_PASSWORD || "default_seceret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
