import { Router } from "express";
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teachers";

export const teachers = Router();

teachers.get("/", getAllTeachers);
teachers.get("/:id", getTeacherById);
teachers.post("/", createTeacher);
teachers.put("/:id", updateTeacher);
teachers.delete("/:id", deleteTeacher);
