"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const class_1 = require("../controllers/class");
const classes = express_1.default.Router();
classes.post("/", class_1.createClass);
classes.get("/", class_1.getAllClasses);
classes.get("/:id", class_1.getClassById);
classes.put("/:id", class_1.updateClass);
classes.delete("/:id", class_1.deleteClass);
classes.get("/:id/students", class_1.getClassStudents);
classes.get("/:id/subjects", class_1.getClassSubjects);
classes.get("/:id/teachers", class_1.getClassTeachers);
classes.get("/:id/semesters", class_1.getClassSemesters);
exports.default = classes;
