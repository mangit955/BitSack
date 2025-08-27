import { RequestHandler } from "express";
import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";

export const userSignup: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;
    await UserModel.create({
      username: username,
      password: password,
    });
    console.log("User created !!");

    res.status(200).json({
      message: "User Signed up!",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists!",
    });
  }
};
