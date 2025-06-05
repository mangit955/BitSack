import mongoose, {model, Schema} from "mongoose";
mongoose.connect("mongodb+srv://manas272004:manas123@cluster0.ehc3al8.mongodb.net/Brainly")

const UserSchema = new Schema({
    username:{type: String, unique: true},
    password:String
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title:String,
    link:String,
    tags: [{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId: {type:mongoose.Types.ObjectId, ref:'User', required:true}
})

export const ContentModel = model("Content", ContentSchema);