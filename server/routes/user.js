import express from 'express';
import { login, signup } from '../controller/auth.js';
import { getallusers, updateprofile, sendPasswordLink, verifyUserwithIDToken, passwordUpdate, sendOtp, verifyOTP, updatePasswordBasedonOTP, sendOtpForLanguage, verifyOtpForLanguage, BrowserAndOSDetection, verifyEmailOTP, sendEmailOtp, getLoginHistory } from '../controller/users.js';
import auth from '../middleware/auth.js';
import extractUserInfo from "../middleware/ExtractUserInfo.js"

const router = express.Router();

router.post('/signup', extractUserInfo, signup);
router.post('/login', extractUserInfo, login);

// route to send email to reset password
//send email route
router.post('/sendpasswordlink', sendPasswordLink);

// route to validate user at password reset time
router.get('/forgotpassword/:id/:token', verifyUserwithIDToken);

// route to update password
router.post('/:id/:token', passwordUpdate);

// route for twilio setup to send otp to the user
router.post('/send-otp', sendOtp);

// route to verify the otp
router.post('/verify-otp', verifyOTP);

// route to save password to db after verified
router.put('/update-password', updatePasswordBasedonOTP);

router.post('/sending-otp', sendOtpForLanguage);
router.post('/verifying-otp', verifyOtpForLanguage);

router.get('/getallusers', getallusers);

router.patch('/update/:id', auth, updateprofile);

// get browser, os and device, used to get data about user
router.get('/user-info', BrowserAndOSDetection);

//send route for email otp
router.post('/send-email-otp', sendEmailOtp);

//verify route for email otp
router.post('/verify-email-otp', verifyEmailOTP);

router.get('/login-history/:userId', getLoginHistory);

export default router;
