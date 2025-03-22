import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"



const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//login user
export const loginUser = async(req,res)=>{
    const{password,email} = req.body;
        try {
                const user = await userModel.findOne({email});
                if(!user){
                    return res.json({success:false , message:"User Doesn't exists"})
                }
                const isMatch = await bcrypt.compare(password , user.password)
                if(!isMatch){
                    return res.json({success:false, message:"Invalid credentails"})
                }
                const token = createToken(user._id);
                res.json({success:true ,user,token })

        } catch (error) {
                console.log(error)
                res.json({success:false , message:"error"})
        }
}

       
//register user 
export const registerUser = async(req ,res )=>{
    const{name,password,email} = req.body;
    try {
            //checking is user already exists 
            const exists = await userModel.findOne({email});
            if(exists){
                    return res.json({success:false , message:"User already exists"})
            }
            //validation for email and strong password
            if(!validator.isEmail(email)){
                return res.json({success:false, message:"Please enter a valid email"})
            }
            if(password.length <8){
                return res.json({success:false,message: "Please enter a strong password"})
            }
            //hasing  password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser =  await userModel.create({
                  name: name,
                   email: email,
                   password:hashedPassword
            })
            const token = createToken(newUser._id)
            res.json({success:true,newUser,token })

        } catch (error) {
            res.json({success: false , message:"Error"})
        }
}