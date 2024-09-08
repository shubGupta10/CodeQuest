import express from "express"
import { Askquestion,getallquestion,deletequestion,votequestion } from "../controller/Question.js"

import auth from "../middleware/auth.js"

const router=express.Router();

//ask questions route
router.post('/Ask',auth,Askquestion);

//get all routes
router.get('/get',getallquestion);
router.delete("/delete/:id",auth,deletequestion);
router.patch("/vote/:id",auth,votequestion)


export default router;