"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedule_1 = require("../controllers/schedule");
const router = (0, express_1.Router)();
// Routes for schedules
router.post('/', schedule_1.createSchedule);
router.get('/', schedule_1.getAllSchedules);
router.get('/:id', schedule_1.getScheduleById);
router.put('/:id', schedule_1.updateSchedule);
router.delete('/:id', schedule_1.deleteSchedule);
exports.default = router;
