import { Router } from "express";
import {
  userSignUpValidation,
  loginValidation,
} from "../middleware/validation";
import {
  createUser,
  loginUser,
  logoutUser,
  renewTokens,
} from "../controllers/User";
import { verifyToken } from "../middleware/jwt";

const router = Router();

router.post("/signup", userSignUpValidation, createUser);
router.post("/login", loginValidation, loginUser);
router.get("/refresh", renewTokens);
router.get("/logout", verifyToken, logoutUser);

export default router;
