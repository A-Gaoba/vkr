"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedule = exports.updateSchedule = exports.getScheduleById = exports.getAllSchedules = exports.createSchedule = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dayOfWeek, startTime, endTime, classId, subjectId, semesterId } = req.body;
    if (!dayOfWeek ||
        !startTime ||
        !endTime ||
        !classId ||
        !subjectId ||
        !semesterId) {
        res
            .status(400)
            .json({
            error: "Missing required fields: dayOfWeek, startTime, endTime, classId, subjectId, or semesterId.",
        });
        return;
    }
    try {
        const newSchedule = yield prisma.schedule.create({
            data: {
                dayOfWeek,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                class: { connect: { id: classId } },
                subject: { connect: { id: subjectId } },
                semester: { connect: { id: semesterId } },
            },
            include: {
                class: true,
                subject: true,
                semester: true,
            },
        });
        res.status(201).json(newSchedule);
    }
    catch (error) {
        console.error("Failed to create schedule:", error);
        res
            .status(500)
            .json({ error: "Unable to create schedule due to an unexpected error." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createSchedule = createSchedule;
const getAllSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield prisma.schedule.findMany({
            include: {
                class: true,
                subject: true,
                semester: true,
            },
        });
        res.json(schedules);
    }
    catch (error) {
        console.error("Failed to retrieve schedules:", error);
        res.status(500).json({ error: "Failed to retrieve schedules." });
    }
});
exports.getAllSchedules = getAllSchedules;
const getScheduleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const schedule = yield prisma.schedule.findUnique({
            where: { id },
            include: {
                class: true,
                subject: true,
                semester: true,
            },
        });
        if (schedule) {
            res.json(schedule);
        }
        else {
            res.status(404).json({ error: "Schedule not found." });
        }
    }
    catch (error) {
        console.error("Failed to retrieve schedule:", error);
        res.status(500).json({ error: "Failed to retrieve schedule." });
    }
});
exports.getScheduleById = getScheduleById;
const updateSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { dayOfWeek, startTime, endTime, classId, subjectId, semesterId } = req.body;
    try {
        const updatedSchedule = yield prisma.schedule.update({
            where: { id },
            data: {
                dayOfWeek,
                startTime: startTime ? new Date(startTime) : undefined,
                endTime: endTime ? new Date(endTime) : undefined,
                class: classId ? { connect: { id: classId } } : undefined,
                subject: subjectId ? { connect: { id: subjectId } } : undefined,
                semester: semesterId ? { connect: { id: semesterId } } : undefined,
            },
            include: {
                class: true,
                subject: true,
                semester: true,
            },
        });
        res.json(updatedSchedule);
    }
    catch (error) {
        console.error("Failed to update schedule:", error);
        res.status(500).json({ error: "Failed to update schedule." });
    }
});
exports.updateSchedule = updateSchedule;
const deleteSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.schedule.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        console.error("Failed to delete schedule:", error);
        res.status(500).json({ error: "Failed to delete schedule." });
    }
});
exports.deleteSchedule = deleteSchedule;
