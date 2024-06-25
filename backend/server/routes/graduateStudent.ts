import { Router } from "express";
import {
  graduateStudent,
  getGraduatedStudents,
} from "../controllers/graduateStudent";

const router = Router();

// Route to mark a student as graduated
router.post("/:id", graduateStudent);

// Route to get all graduated students
router.get("/", getGraduatedStudents);

export default router;
