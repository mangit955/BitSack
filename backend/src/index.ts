import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import dotenv, { populate } from "dotenv";
import { randomUUID } from "crypto";
import cors from "cors";

dotenv.config();

const app = express();
interface AuthRequest extends Request {
  userId?: string;
}

app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  //zod validation, hash the password
  const username = req.body.username;
  const password = req.body.password;

  try {
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
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await UserModel.findOne({
    username,
    password,
  });

  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_PASSWORD
    );

    res.json({
      token,
    });
  } else {
    res.status(411).json({
      message: "Incorrect Credentials!",
    });
  }
});

app.post(
  "/api/v1/content",
  userMiddleware,
  async (req: AuthRequest, res: Response) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
      title: req.body.title || "Untitled",
      link,
      type,
      userId: req.userId,
      tags: [],
      shareLink: null,
    });

    res.json({
      message: "Content added!",
    });
  }
);

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "username");
  res.json({
    content,
  });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const authReq = req as AuthRequest;
  const contentId = req.body.contentId;
  const result = await ContentModel.deleteOne({
    _id: contentId,
    userId: authReq.userId,
  });

  if (result.deletedCount === 0) {
    res.status(404).json({
      message: " Content not found",
    });
  } else {
    res.json({
      message: "Deleted successfully!",
    });
  }
});

app.post("/api/v1/brain/content/share", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;
  const shareLink = randomUUID();
  const content = await ContentModel.findByIdAndUpdate(
    contentId,
    { shareLink },
    { new: true }
  );
  console.log("Updated content:", content);

  if (!content) {
    res.status(404).json({
      message: "Content not found",
    });
  } else {
    res.json({
      message: "Content shared successfully!",
      shareLink: `${req.protocol}://${req.get(
        "host"
      )}/api/v1/brain/${shareLink}`,
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const shareLink = req.params.shareLink;
  console.log("Looking for shared Link:", shareLink);
  const content = await ContentModel.findOne({ shareLink });

  if (!content) {
    res.status(404).json({
      message: "Shared content not found",
    });
  } else {
    res.json({
      link: content.link,
    });
  }
});

app.listen(3000);
