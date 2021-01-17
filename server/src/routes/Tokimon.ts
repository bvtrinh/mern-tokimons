import { Router } from "express";
import {
  createToki,
  getAllToki,
  getOneToki,
  updateToki,
  deleteToki,
} from "../controllers/Tokimon";
import { tokiValidation } from "../middleware/validation";
import { verifyToken } from "../middleware/jwt";

const router = Router();

router.post("/", verifyToken, tokiValidation, createToki);
router.get("/", verifyToken, getAllToki);
router.get("/:id", verifyToken, getOneToki);
router.patch("/:id", verifyToken, tokiValidation, updateToki);
router.delete("/:id", verifyToken, deleteToki);

export default router;
