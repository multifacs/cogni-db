import { Router } from "express";
import {
  getResults,
  createResult,
} from "../controllers/test.controller";

const router = Router();

router.get("/:test", getResults);
router.post("/:test", createResult);

export default router;
