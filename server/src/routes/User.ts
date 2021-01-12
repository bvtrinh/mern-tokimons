import { Router } from "express";
import {
  userSignUpValidation,
  loginValidation,
} from "../middleware/validation/validation";
import { createUser, loginUser } from "../controllers/User";
import { renewTokens } from "../auth/jwt";

const router = Router();

router.post("/signup", userSignUpValidation, createUser);
router.post("/login", loginValidation, loginUser);
router.get("/refresh", renewTokens);

export default router;
