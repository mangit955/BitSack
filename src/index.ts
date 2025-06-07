import express,{Request, Response, }from "express";
import mongoose  from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import dotenv from "dotenv";

dotenv.config();

const app = express ();
interface AuthRequest extends Request{
    userId?: string;
}


app.use(express.json());

app.post("/api/v1/signup", async (req, res)=> {
    //zod validation, hash the password
    const username = req.body.username;
    const password = req.body.password;

   try {
    await UserModel.create({
        username:username,
        password:password
    })
    console.log("User created !!");

    res.status(200).json({
        message: "User Signed up!"
    })
} catch(e){
    res.status(411).json({
        message: "User already exists!"
    })
}

})

app.post("/api/v1/signin", async(req, res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })

    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(411).json({
            message: "Incorrect Credentials!"
        })
    }

    
})

app.post("/api/v1/content",userMiddleware, async (req: AuthRequest, res: Response)=> {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        userId: req.userId,
        tags: []
    })

     res.json({
        message: "Content added!"
    })
    
})

app.post("/api/v1/content1", (req, res)=> {
    
})

app.post("/api/v1/brain/share", (req, res)=> {
    
})

app.post("/api/v1/brain/:shareLink", (req, res)=> {
    
})

app.listen(3000);