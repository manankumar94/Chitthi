import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:3,
        max:20,
    },
    email: {
        type: String,
        required: true,
        max:20,
    },
    password:{
        type: String,
        required: true,
        min:4,
    },
    isAvatarImageSet : {
        type: Boolean,
        default: false
    },
    avatarImage:{
        type: String,
        default:"",
    }
})

const userModel = mongoose.model("users", userSchema);

export default userModel;