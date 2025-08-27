import { Router } from "express";
import { userSignin } from "../controllers/authControllers/userSignin";
import { userSignup } from "../controllers/authControllers/userSignup";

const router = Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);

export default router;
