import mongoose from "mongoose";

const userschema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: String },
    tags: { type: [String] },
    joinedon: { type: Date, default: Date.now },
    verifiedToken: { type: String },
    phoneNumber: { type: String, required: true },
    otp: { type: String, default: null },
    otpExpired: {
        type: Date,
        default: Date.now,
        get: (otpExpired) => otpExpired.getTime(),
        set: (otpExpired) => new Date(otpExpired)
    },
    browser: { type: String },
    os: { type: String }, 
    ip: { type: String },
});

export default mongoose.model("User", userschema);
