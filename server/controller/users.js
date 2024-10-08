import mongoose from "mongoose"
import users from '../models/auth.js'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import optgenerator from 'otp-generator'
import twilio from 'twilio'
import {otpValidation} from './OtpValidate.js'
import {userInfo, getIPAdress} from '../utils/utils.js'
import crypto from 'crypto';
import { sendEmail } from '../config/emailConfig.js';
import { UserLoginHistory } from "../models/UserLoginHistory.js";


dotenv.config();

const secretkey = process.env.JWT_SECRET

//twilio config

const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const twilioSetup = twilio(twilioAccountSID, twilioAuthToken);

//email configuration

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const getallusers = async (req, res) => {
    try {
        const allusers = await users.find()
        const alluserdetails = [];
        allusers.forEach((user) => {
            alluserdetails.push({_id:user._id,
                name:user.name,
                about:user.about,
                tags:user.tags,
                joinedon:user.joinedon,
            });     
        });
        res.status(200).json(alluserdetails)
    } catch (error) {
        res.status(404).json({message:error.message})
        return
    }
}
export const updateprofile=async(req,res)=>{
    const{id:_id}=req.params;
    const {name,about,tags}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("user unavailable");
    }
    try {
        const updateprofile=await users.findByIdAndUpdate(_id,{$set:{name:name,about:about,tags:tags}},
            {new:true}
        );
        res.status(200).json(updateprofile)
    } catch (error) {
        res.status(404).json({message:error.message})
        return
    }
}

//got a little help of youtube
//used some web to work with jwt
export const sendPasswordLink = async (req,res) => {
    console.log(req.body);

    const {email} = req.body;

    if(!email){
        res.status(401).json({status: 401, message: "Enter your Email"})
    }


    try {
        const findUserintoDB = await users.findOne({email: email});

        //generating tokens for reset link
        const token = jwt.sign({_id:findUserintoDB._id}, secretkey,{
            expiresIn:"1h"
        });

        const  storeTokentoDb = await users.findByIdAndUpdate({_id:findUserintoDB._id}, {verifiedToken: token}, {new: true});

        console.log("HEre is ur stored token", storeTokentoDb);

        if(storeTokentoDb){
            const mailOptions = {
                from: "shubhamkgupta720@gmail.com",
                to: email,
                subject: "Sending email to reset password",
                text: `This link will expires in 1 hour https://code-quest-three.vercel.app/forgotpassword/${findUserintoDB.id}/${findUserintoDB.verifiedToken}`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log("error", error);
                    res.status(401).json({status: 401, message: "email not sent"});
                }else{
                    console.log("Email sent", info.response);
                    res.status(201).json({status: 201, message: "Email sent sucessfully"});
                }
            })
        }

    } catch (error) {
        res.status(401).json({status: 401, message: "Email not sent"});
    }
}

//here we are verifying user at password reset time
export const verifyUserwithIDToken = async (req, res) => {
    const { id, token } = req.params;
    try {
      const verifyToken = jwt.verify(token, secretkey);
      if (verifyToken._id === id) {
        res.status(201).json({ status: 201, message: "Token verified successfully" });
      } else {
        res.status(401).json({ status: 401, message: "Invalid token" });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(401).json({ status: 401, error: error.message });
    }
  };
  


  // used little help of youtube to fix issue in code.
export const passwordUpdate = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    try {
      const newPassword = await bcrypt.hash(password, 12);
      const updatedUser = await users.findByIdAndUpdate(id, { password: newPassword });
  
      if (!updatedUser) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }
  
      res.status(201).json({ status: 201, message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ status: 500, error: error.message });
    }
  };
  
  

  //Got little help of youtube to see setup of Twilio
  // got little help of chatGpt to fix the issues and little bugs into UI.
export const sendOtp = async (req, res) => {
    try {
        const {phoneNumber} = req.body;
        const otp = optgenerator.generate(6, {lowerCaseAlphabets: false, specialChars: false});
        const newdate = new Date();
         await users.findOneAndUpdate(
            {phoneNumber},
            {otp, otpExpired: new Date(newdate.getTime())},
            {upsert: true, new: true, setDefaultOnInsert: true}
        )
        await twilioSetup.messages.create({
            body: `Your Otp is: ${otp}`,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });
        return res.status(200).json({
            success: true,
            msg: "OTP sent successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


// used little help of chatGpt to find an error 
export const verifyOTP = async (req, res) => {
    try {
        const {phoneNumber, otp} = req.body;
        const otpData = await users.findOne({
            phoneNumber,
            otp
        });
        if(!otpData){
            return res.status(400).json({
                success: false,
                msg: "Your entered wrong Otp!"
            });
        }
        const isOtpVerified = await otpValidation(otpData.otpExpired);
        if(isOtpVerified){
            return res.status(400).json({
                success: false,
                msg: "Your OTP has been expired!"
            })
        }
        return res.status(200).json({
            success: true,
            msg: "Your OTP Verified Successfully!"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }
}


//got a little help from web to fix issue about user Id.
export const updatePasswordBasedonOTP = async (req, res) => {
    const { phoneNumber, otp, newPassword } = req.body;
    try {
        const user = await users.findOne({ phoneNumber, otp });
        if (!user) {
            return res.status(400).json({ success: false, msg: "Invalid OTP or phone number" });
        }
        const isOtpValid = await otpValidation(user.otpExpired);
        if (isOtpValid) {
            return res.status(400).json({ success: false, msg: "OTP has expired" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await users.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            $unset: { otp: "", otpExpired: "" }
        });
        res.status(200).json({ success: true, msg: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ success: false, msg: "Failed to change password. Please try again." });
    }
};  



//************************** Used helped with chatgpt and stack over flow ***********************88 */


//used help of youtube to build logic for the code.
export const sendOtpForLanguage = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const otp = optgenerator.generate(6, { lowerCaseAlphabets: false, specialChars: false });
        const newdate = new Date();

        await users.findOneAndUpdate(
            { phoneNumber },
            { 
                otp, 
                otpExpired: new Date(newdate.getTime()),
                otpPurpose: 'languageChange'
            },
            { upsert: true, new: true, setDefaultOnInsert: true }
        );

        await twilioSetup.messages.create({
            body: `Your OTP for language change is: ${otp}`,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });

        return res.status(200).json({
            success: true,
            msg: "OTP for language change sent successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

//used help of chatGpt to fix some error and also got helped of stack overflow to build logic
export const verifyOtpForLanguage = async (req, res) => {
    try {
        const { phoneNumber, otp, langCode } = req.body;
        if (langCode === 'en') {
            return res.status(200).json({
                success: true,
                msg: "Language changed to English successfully!"
            });
        }
        const otpData = await users.findOne({
            phoneNumber,
            otp
        });
        if (!otpData) {
            return res.status(400).json({
                success: false,
                msg: "Invalid OTP. Please try again."
            });
        }
        const isOtpExpired = await otpValidation(otpData.otpExpired);
        if (isOtpExpired) {
            return res.status(400).json({
                success: false,
                msg: "Your OTP has expired!"
            });
        }
        await users.findOneAndUpdate(
            { phoneNumber },
            { $unset: { otp: 1, otpExpired: 1, otpPurpose: 1 } }
        );
        return res.status(200).json({
            success: true,
            msg: "OTP verified successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}


//******** Taken help with ChatGpt **********

export const BrowserAndOSDetection = (req, res) => {
    const user = req.headers['user-agent'];
    const {browser, os, device} = userInfo(user);
    const ipAddress = getIPAdress(req);
    res.json({browser, os, device, ipAddress});
}



const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// Send OTP
export const sendEmailOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const otp = generateOtp();
        await users.findOneAndUpdate(
            { email },
            { otp, otpExpired: Date.now() + 10 * 60 * 1000 }
        );
        const subject = 'Your OTP Code';
        const text = `Your OTP code is ${otp}`;
        await sendEmail(email, subject, text);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};

//taken help with ChatGpt
// Verify OTP
export const verifyEmailOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        console.log(`Verifying OTP for email: ${email}`);
        const user = await users.findOne({ email });
        
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'User not found' });
        }
        
        console.log(`User found. Stored OTP: ${user.otp}, Expiry: ${user.otpExpired}`);
        console.log(`Current time: ${Date.now()}`);
        
        if (user.otp !== otp) {
            console.log('OTP mismatch');
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        
        if (user.otpExpired < Date.now()) {
            console.log('OTP expired');
            return res.status(400).json({ message: 'OTP expired' });
        }

        user.otp = null;
        user.otpExpired = null;

        try {
            await user.save({ validateBeforeSave: false });
            console.log('OTP verified successfully');
            res.status(200).json({ message: 'OTP verified successfully', user: { email: user.email } });
        } catch (saveError) {
            console.error('Error saving user:', saveError);
            res.status(500).json({ message: 'OTP verified, but failed to update user' });
        }
    } catch (error) {
        console.error('Error in OTP verification:', error);
        res.status(500).json({ message: 'Failed to verify OTP' });
    }
};


//Taken little help of Stack Overflow for an error
export const getLoginHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const loginHistory = await UserLoginHistory.find({ userId })
            .sort({ Timestamp: -1 })
            .limit(10); 
        res.json(loginHistory);
    } catch (error) {
        console.error('Error fetching login history:', error);
        res.status(500).json({ message: 'Failed to fetch login history' });
    }
};