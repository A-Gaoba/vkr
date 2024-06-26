"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const graduateStudent_1 = require("../controllers/graduateStudent");
const router = (0, express_1.Router)();
// Route to mark a student as graduated
router.post("/:id", graduateStudent_1.graduateStudent);
// Route to get all graduated students
router.get("/", graduateStudent_1.getGraduatedStudents);
exports.default = router;
