import express from "express";
import {
  createSubject,
  assignTeacherToSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controllers/subject";

const subjects = express.Router();

subjects.post("/", createSubject);
subjects.get("/", getAllSubjects);
subjects.get("/:id", getSubjectById);
subjects.put("/:id", updateSubject);
subjects.delete("/:id", deleteSubject);
subjects.post("/assign-teacher", assignTeacherToSubject);

export default subjects;
