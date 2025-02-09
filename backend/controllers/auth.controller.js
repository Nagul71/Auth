import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
export const Signup = async (req,res)=>{
    try {

        const {username,fullName,email,password} = req.body;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email))
        {
            return res.status(400).json({error:"Invalid Email"});
        }

        const existingEmail = await User.findOne({email});
        const existingUsername = await User.findOne({username});

        if(existingEmail || existingUsername)
        {
            return res.status(400).json({erro:"User Already Existing"});
        }

        if(password < 6)
        {
            res.status(400).json({error:"Password is not correclty configured"});
        }

        const salt = await bcrypt.genSalt(10);
        const hasedpassword = await bcrypt.hash(password,salt);


        const newUser = new User({
            username,
            fullName,
            password : hasedpassword,
            email
        })

        if(newUser)
        {
            await newUser.save();
            res.status(200).json({message:"user Created Succesfully"});
        }
        else
        {
            res.status(400).json({error:"Invalid User Data"});
        }
        
    } catch (error) {
        console.log(`ERROR MESSAGE ${error}`);
        return res.status(400).json({error:"Internal Server error"});
        
    }
}

export const Login = (req,res)=>{
    res.send("LOGIN PAGE LOADING.....")
}

export const Logout = (req,res)=>{
    res.send("LOGout PAGE LOADING.....")
}