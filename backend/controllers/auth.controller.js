import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";

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
            generateToken(newUser._id,res);
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

export const Login = async (req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isExistingpass = await bcrypt.compare(password,user?.password || " ");

        if(!user || !isExistingpass)
        {
            return res.status(400).json({error:"Invalid Username or Password"});
        }

        generateToken(user._id,res);

        return res.status(200).json({
            message : "User connected to dashboard"
        })
    } catch (error) {
        console.log(`Error in the login ${error}`);
        return res.status(500).json({error:"Internal Server Error"});
            
    }

}

export const Logout = (req,res)=>{
    try {
        res.cookie("jwt"," ",{maxAge: 0})
        return res.status(200).json({message:"User logged out sucessfully"});
        
    } catch (error) {
        console.log(`Error in the logout ${error}`);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

export const Getme = async (req,res)=>{
    try {
        const user = await User.findOne({_id : req.user._id}).select("-password");
        res.status(200).json(user);
        
    } catch (error) {
        console.log(`Error in the Getme ${error}`);
        res.status(500).json({error:"Internal Server Error"});
    }
}