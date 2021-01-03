import { create } from "domain";
import { Router } from "express";
import { createToki } from "../controllers/Tokimon";

const router = Router();

router.post("/", createToki);

export default router;
