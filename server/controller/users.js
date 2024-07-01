import mongoose from "mongoose"
import users from '../models/auth.js'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config();

const secretkey = process.env.JWT_SECRET

//email configuration

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "shubhamkgupta720@gmail.com",
        pass: "ncxf enkd yvyb oztc"
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
            expiresIn:"1d"
        });

        const  storeTokentoDb = await users.findByIdAndUpdate({_id:findUserintoDB._id}, {verifiedToken: token}, {new: true});

        console.log("HEre is ur stored token", storeTokentoDb);

        if(storeTokentoDb){
            const mailOptions = {
                from: "shubhamkgupta720@gmail.com",
                to: email,
                subject: "Sending email to reset password",
                text: `This link will expires in 2 minutes http://localhost:3000/forgotpassword/${findUserintoDB.id}/${findUserintoDB.verifiedToken}`
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
  
  