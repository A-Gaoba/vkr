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
exports.deleteEnrollment = exports.updateEnrollment = exports.getEnrollmentById = exports.getAllEnrollments = exports.createEnrollment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, subjectId, semesterId } = req.body;
    if (!studentId || !subjectId || !semesterId) {
        res.status(400).json({ error: "Missing required fields: studentId, subjectId, or semesterId." });
        return;
    }
    try {
        const newEnrollment = yield prisma.enrollment.create({
            data: {
                student: { connect: { id: studentId } },
                subject: { connect: { id: subjectId } },
                semester: { connect: { id: semesterId } },
            },
            include: {
                student: true,
                subject: true,
                semester: true,
            },
        });
        res.status(201).json(newEnrollment);
    }
    catch (error) {
        console.error("Failed to create enrollment:", error);
        res.status(500).json({ error: "Unable to create enrollment due to an unexpected error." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createEnrollment = createEnrollment;
const getAllEnrollments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enrollments = yield prisma.enrollment.findMany({
            include: {
                student: true,
                subject: true,
                semester: true,
            },
        });
        res.json(enrollments);
    }
    catch (error) {
        console.error("Failed to retrieve enrollments:", error);
        res.status(500).json({ error: "Failed to retrieve enrollments." });
    }
});
exports.getAllEnrollments = getAllEnrollments;
const getEnrollmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const enrollment = yield prisma.enrollment.findUnique({
            where: { id },
            include: {
                student: true,
                subject: true,
                semester: true,
            },
        });
        if (enrollment) {
            res.json(enrollment);
        }
        else {
            res.status(404).json({ error: "Enrollment not found." });
        }
    }
    catch (error) {
        console.error("Failed to retrieve enrollment:", error);
        res.status(500).json({ error: "Failed to retrieve enrollment." });
    }
});
exports.getEnrollmentById = getEnrollmentById;
const updateEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { studentId, subjectId, semesterId } = req.body;
    try {
        const updatedEnrollment = yield prisma.enrollment.update({
            where: { id },
            data: {
                student: studentId ? { connect: { id: studentId } } : undefined,
                subject: subjectId ? { connect: { id: subjectId } } : undefined,
                semester: semesterId ? { connect: { id: semesterId } } : undefined,
            },
            include: {
                student: true,
                subject: true,
                semester: true,
            },
        });
        res.json(updatedEnrollment);
    }
    catch (error) {
        console.error("Failed to update enrollment:", error);
        res.status(500).json({ error: "Failed to update enrollment." });
    }
});
exports.updateEnrollment = updateEnrollment;
const deleteEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.enrollment.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        console.error("Failed to delete enrollment:", error);
        res.status(500).json({ error: "Failed to delete enrollment." });
    }
});
exports.deleteEnrollment = deleteEnrollment;
