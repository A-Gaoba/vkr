import { Router } from "express";
import {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
} from "../controllers/grade";

const router = Router();

// Routes for grades
router.post("/", createGrade);
router.get("/", getAllGrades);
router.get("/:id", getGradeById);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);

export default router;
