import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

class UserController{
    static register= async (req, res, next) =>{
        try {
            const {username, email, password}= req.body;
            const userExist = await userModel.findOne({email});
            if(userExist){
                return  res
                         .status(400)
                         .json({
                            status: false,
                            Message:"User Already Exist"})
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser= await userModel.create({
                username,
                email,
                password: hashedPassword,
            })
            delete newUser.password;
            return  res
                         .status(200)
                         .json({
                            status: true,
                            Mesaage: "User Registered Successfully",
                            newUser,
                         }) 
        } catch (error) {
            return  res
                         .status(400)
                         .json({
                            status: false,
                            Message: error.Mesaage})
        }
    }
}

export default UserController;