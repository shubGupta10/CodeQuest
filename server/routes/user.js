import express from "express"
import  {login,signup} from '../controller/auth.js'
import { getallusers,updateprofile, sendPasswordLink, verifyUserwithIDToken, passwordUpdate } from "../controller/users.js";
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

router.get("/getallusers",getallusers)

router.patch("/update/:id",auth,updateprofile)


export default router