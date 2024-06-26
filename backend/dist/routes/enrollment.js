"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollment_1 = require("../controllers/enrollment");
const router = (0, express_1.Router)();
// Routes for enrollments
router.post("/", enrollment_1.createEnrollment);
router.get("/", enrollment_1.getAllEnrollments);
router.get("/:id", enrollment_1.getEnrollmentById);
router.put("/:id", enrollment_1.updateEnrollment);
router.delete("/:id", enrollment_1.deleteEnrollment);
exports.default = router;
