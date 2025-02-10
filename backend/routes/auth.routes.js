import express from "express";
import { Signup,Login,Logout,Getme } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protected.js";

const router = express.Router();

router.post("/signup",Signup)
router.post("/logout",Logout)
router.post("/login",Login)
router.get("/me",protectRoute,Getme)


export default router;