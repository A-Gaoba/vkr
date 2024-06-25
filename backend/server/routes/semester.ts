import { Router } from "express";
export const semesters = Router();

import {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
} from "../controllers/semester";

semesters.post("/", createSemester);
semesters.get("/", getAllSemesters);
semesters.get("/:id", getSemesterById);
semesters.put("/:id", updateSemester);
semesters.delete("/:id", deleteSemester);
