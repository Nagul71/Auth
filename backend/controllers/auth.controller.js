import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer"
import crypto from "crypto"
import dotenv from "dotenv";
dotenv.config();


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

        if(password.length < 6)
        {
            res.status(400).json({error:"password is not correclty configured"});
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
            return res.status(400).json({error:"Invalid Username or password"});
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

export const Forgot = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate a secure reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10); // Hashing the token

        // Store hashed token in DB with expiry time (1 hour)
        user.resetpasswordToken = hashedToken;
        user.resetpasswordExpires = Date.now() + 3600000;
        await user.save();

        // Configure email transporter securely
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER, // Load from env
                pass: process.env.EMAIL_PASS, // Load from env
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const mailOptions = {
            to: email,
            subject: "password Reset Request",
            html: `
                <p>You requested a password reset.</p>
                <p>Click <a href="${resetLink}" target="_blank" style="color: blue; text-decoration: underline;">here</a> to reset your password.</p>
                <p>This link is valid for 1 hour.</p>
            `,
        };


        // Attempt to send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "password reset link sent to email" });
    } catch (error) {
        console.error(`Error in Forgot password: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const Reset = async (req, res) => {
    try {
        const {token,password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ error: "Token and new password are required" });
        }

        // Find user with matching reset token & check expiration
        const user = await User.findOne({ resetpasswordToken: token, resetpasswordExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update password in database
        user.password = hashedPassword;
        user.resetpasswordToken = undefined; // Clear the reset token
        user.resetpasswordExpires = undefined; // Clear the expiration
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(`Error in Reset password: ${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
