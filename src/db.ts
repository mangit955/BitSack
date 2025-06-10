import mongoose, {model, Schema} from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || "";
mongoose.connect(DATABASE_URL)
.then(() => console.log("Connected to DB"))
.catch((err) => console.error("DB connection error:",err));

const UserSchema = new Schema({
    username:{type: String, unique: true},
    password:String
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title:String,
    link:String,
    type: String,
    tags: [{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId: {type:mongoose.Types.ObjectId, ref:'User', required:true},
    shareLink:{type:String, default:null}
})

export const ContentModel = model("Content", ContentSchema);