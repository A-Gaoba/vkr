import express from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  getClassStudents,
  getClassSubjects,
  getClassTeachers,
  getClassSemesters,
} from "../controllers/class";

const classes = express.Router();
classes.post("/", createClass);
classes.get("/", getAllClasses);
classes.get("/:id", getClassById);
classes.put("/:id", updateClass);
classes.delete("/:id", deleteClass);
classes.get("/:id/students", getClassStudents);
classes.get("/:id/subjects", getClassSubjects);
classes.get("/:id/teachers", getClassTeachers);
classes.get("/:id/semesters", getClassSemesters);

export default classes;
