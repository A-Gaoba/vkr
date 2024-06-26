"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.students = void 0;
const express_1 = require("express");
const students_1 = require("../controllers/students");
exports.students = (0, express_1.Router)();
exports.students.post('/', students_1.createStudent);
exports.students.get('/', students_1.getAllStudents);
exports.students.get('/:id', students_1.getStudentById);
exports.students.put('/:id', students_1.updateStudent);
exports.students.delete('/:id', students_1.deleteStudent);