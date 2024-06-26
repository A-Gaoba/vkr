"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grade_1 = require("../controllers/grade");
const router = (0, express_1.Router)();
// Routes for grades
router.post("/", grade_1.createGrade);
router.get("/", grade_1.getAllGrades);
router.get("/:id", grade_1.getGradeById);
router.put("/:id", grade_1.updateGrade);
router.delete("/:id", grade_1.deleteGrade);
exports.default = router;
