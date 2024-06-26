"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subject_1 = require("../controllers/subject");
const subjects = express_1.default.Router();
subjects.post("/", subject_1.createSubject);
subjects.get("/", subject_1.getAllSubjects);
subjects.get("/:id", subject_1.getSubjectById);
subjects.put("/:id", subject_1.updateSubject);
subjects.delete("/:id", subject_1.deleteSubject);
subjects.post("/assign-teacher", subject_1.assignTeacherToSubject);
exports.default = subjects;
