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

        // Store hashed token in DB with expiry time (1 hour)
        user.resetpasswordToken = resetToken;
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
            subject: "🔐 Reset Your Password - Action Required",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #333; text-align: center;">🔑 Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>We received a request to reset your password. If this was you, click the button below to proceed:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${resetLink}" target="_blank" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 12px 20px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    </div>
                    <p>If you didn’t request this, you can safely ignore this email. Your password will remain unchanged.</p>
                    <p style="color: #888; font-size: 12px;">This link is valid for <strong>1 hour</strong>. For security reasons, do not share this email with anyone.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <p style="text-align: center; color: #555; font-size: 14px;">Need help? Contact our support team.</p>
                </div>
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
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ resetpasswordToken: token });
        
        console.log('User search result:', {
            userFound: !!user,
            tokenMatches: user?.resetpasswordToken === token,
            tokenExpiration: user?.resetpasswordExpires,
            currentTime: new Date(),
            isExpired: user?.resetpasswordExpires < Date.now()
        });

        if (!user) {
            return res.status(400).json({ 
                error: "Invalid or expired token",
                debug: "No user found with this token"
            });
        }

        if (user.resetpasswordExpires < Date.now()) {
            return res.status(400).json({ 
                error: "Invalid or expired token",
                debug: "Token has expired"
            });
        }

        // Continue with password reset...
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.resetpasswordToken = undefined;
        user.resetpasswordExpires = undefined;
        
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ 
            error: "Internal Server Error",
            details: error.message
        });
    }
};