import express from "express"
import  {login,signup} from '../controller/auth.js'
import { getallusers,updateprofile, sendPasswordLink, verifyUserwithIDToken, passwordUpdate, sendOtp, verifyOTP, updatePasswordBasedonOTP, sendOtpForLanguage, verifyOtpForLanguage, BrowserAndOSDetection } from "../controller/users.js";
import auth from "../middleware/auth.js"

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);

//route to send email to reset password
router.post("/sendpasswordlink", sendPasswordLink);

//route for validate user at password reset time
router.get("/forgotpassword/:id/:token", verifyUserwithIDToken);

//route to update password
router.post("/:id/:token", passwordUpdate);

//route for twilio setup to sent otp to the user
router.post("/send-otp",sendOtp);

//route to verify the otp
router.post("/verify-otp", verifyOTP);

//route to save password to db after verified
router.put("/update-password", updatePasswordBasedonOTP)


router.post("/sending-otp", sendOtpForLanguage);
router.post("/verifying-otp", verifyOtpForLanguage);

router.get("/getallusers",getallusers)

router.patch("/update/:id",auth,updateprofile)

//get browser, os and device
router.get("/user-Info", BrowserAndOSDetection);


export default router