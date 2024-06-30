import express from "express"
import  {login,signup} from '../controller/auth.js'
import { getallusers,updateprofile, sendPasswordLink } from "../controller/users.js";
import auth from "../middleware/auth.js"

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);

//route to send email to reset password
router.post("/sendpasswordlink", sendPasswordLink);

router.get("/getallusers",getallusers)

router.patch("/update/:id",auth,updateprofile)


export default router