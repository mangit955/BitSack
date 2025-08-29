import { RequestHandler } from "express";
import { Request, Response } from "express";
import { ContentModel } from "../../models/content.model";
import { randomUUID } from "crypto";

interface AuthRequest extends Request {
  userId?: string;
}

export const createContent: RequestHandler = async (req: AuthRequest, res: Response) => {
    try {
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
} catch (err){
    console.error("Error creating content:", err);
    res.status(500).json({
        message: "Internal server error",
    });
}
}

export const getContent: RequestHandler = async (req: Request, res: Response) => {
    try{
          //@ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "name");
  res.json({
    content,
  });
    }catch(err){
        console.error("error fetching content;", err);
        res.status(500).json({
            message: "Internal server error"
        })
    }

}

export const deleteContent: RequestHandler = async (req: Request, res: Response) => {
    try{
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
    }catch(err){
        console.error("Error deleting content:", err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const shareContent: RequestHandler = async (req: Request, res: Response) => {
    try{
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
    } catch(err){
        console.error("Error sharing content:",err);
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

export const shareLink: RequestHandler = async (req: Request, res: Response) => {
    try{
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
    }catch(err){
        console.error("Error fetching shared content:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}