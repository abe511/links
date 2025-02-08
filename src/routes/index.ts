import { Router, Request, Response } from "express";
import { renderIndex } from "../controllers/indexController";
import { generateCombinations } from "../controllers/generateController";

const router = Router();

router.get("/", renderIndex);
router.post("/generate", generateCombinations);

export default router;
