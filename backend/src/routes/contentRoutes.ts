import { Router } from "express";
import { userMiddleware } from "../middleware/authMiddleware";
import { ContentModel } from "../models/content.model";
import { randomUUID } from "crypto";
import { Request } from "express";
import { createContent, deleteContent, getContent, shareContent, shareLink } from "../controllers/contentControllers/contentController";


interface AuthRequest extends Request {
  userId?: string;
}

const router = Router();

router.post("/content", userMiddleware, createContent);
router.get("/content", userMiddleware, getContent);
router.delete("/content", userMiddleware, deleteContent);
router.post("/brain/content/share", userMiddleware, shareContent);
router.get("/brain/:shareLink", userMiddleware, shareLink);

export default router;