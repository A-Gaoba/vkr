"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_1 = require("../controllers/attendance");
const router = (0, express_1.Router)();
// Routes for attendance
router.post('/', attendance_1.createAttendance);
router.get('/', attendance_1.getAllAttendances);
router.get('/:id', attendance_1.getAttendanceById);
router.put('/:id', attendance_1.updateAttendance);
router.delete('/:id', attendance_1.deleteAttendance);
exports.default = router;
