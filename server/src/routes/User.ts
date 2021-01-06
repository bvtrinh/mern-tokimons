import { Router } from "express";
import {
  userSignUpValidation,
  loginValidation,
} from "../middleware/validation/validation";
import { createUser, loginUser } from "../controllers/User";

const router = Router();

router.post("/signup", userSignUpValidation, createUser);
router.post("/login", loginValidation, loginUser);

export default router;
