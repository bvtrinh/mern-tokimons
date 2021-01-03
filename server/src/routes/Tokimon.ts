import { create } from "domain";
import { Router } from "express";
import {
  createToki,
  getAllToki,
  updateToki,
  deleteToki,
} from "../controllers/Tokimon";
import { tokiValidation } from "../middleware/validation/validation";

const router = Router();

router.post("/", tokiValidation, createToki);
router.get("/", getAllToki);
router.patch("/:id", tokiValidation, updateToki);
router.delete("/:id", deleteToki);

export default router;
