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
exports.deleteAttendance = exports.updateAttendance = exports.getAttendanceById = exports.getAllAttendances = exports.createAttendance = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, classId, date, status } = req.body;
    if (!studentId || !classId || !date || !status) {
        res.status(400).json({ error: "Missing required fields: studentId, classId, date, or status." });
        return;
    }
    try {
        const newAttendance = yield prisma.attendance.create({
            data: {
                student: { connect: { id: studentId } },
                class: { connect: { id: classId } },
                date: new Date(date),
                status,
            },
            include: {
                student: true,
                class: true,
            },
        });
        res.status(201).json(newAttendance);
    }
    catch (error) {
        console.error("Failed to create attendance:", error);
        res.status(500).json({ error: "Unable to create attendance due to an unexpected error." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createAttendance = createAttendance;
const getAllAttendances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendances = yield prisma.attendance.findMany({
            include: {
                student: true,
                class: true,
            },
        });
        res.json(attendances);
    }
    catch (error) {
        console.error("Failed to retrieve attendances:", error);
        res.status(500).json({ error: "Failed to retrieve attendances." });
    }
});
exports.getAllAttendances = getAllAttendances;
const getAttendanceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const attendance = yield prisma.attendance.findUnique({
            where: { id },
            include: {
                student: true,
                class: true,
            },
        });
        if (attendance) {
            res.json(attendance);
        }
        else {
            res.status(404).json({ error: "Attendance not found." });
        }
    }
    catch (error) {
        console.error("Failed to retrieve attendance:", error);
        res.status(500).json({ error: "Failed to retrieve attendance." });
    }
});
exports.getAttendanceById = getAttendanceById;
const updateAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { studentId, classId, date, status } = req.body;
    try {
        const updatedAttendance = yield prisma.attendance.update({
            where: { id },
            data: {
                student: studentId ? { connect: { id: studentId } } : undefined,
                class: classId ? { connect: { id: classId } } : undefined,
                date: date ? new Date(date) : undefined,
                status,
            },
            include: {
                student: true,
                class: true,
            },
        });
        res.json(updatedAttendance);
    }
    catch (error) {
        console.error("Failed to update attendance:", error);
        res.status(500).json({ error: "Failed to update attendance." });
    }
});
exports.updateAttendance = updateAttendance;
const deleteAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.attendance.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        console.error("Failed to delete attendance:", error);
        res.status(500).json({ error: "Failed to delete attendance." });
    }
});
exports.deleteAttendance = deleteAttendance;
