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
exports.deleteGrade = exports.updateGrade = exports.getGradeById = exports.getAllGrades = exports.createGrade = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, studentId, subjectId, semesterId } = req.body;
    if (value === undefined || !studentId || !subjectId || !semesterId) {
        res.status(400).json({
            error: "Missing required fields: value, studentId, subjectId, or semesterId.",
        });
        return;
    }
    try {
        // Check if the grade already exists
        const existingGrade = yield prisma.grade.findFirst({
            where: {
                studentId,
                subjectId,
                semesterId,
            },
        });
        if (existingGrade) {
            // Update the existing grade
            const updatedGrade = yield prisma.grade.update({
                where: { id: existingGrade.id },
                data: { value },
                include: {
                    student: true,
                    subject: {
                        include: {
                            class: true,
                        },
                    },
                    semester: true,
                },
            });
            res.status(200).json(updatedGrade);
        }
        else {
            // Create a new grade
            const newGrade = yield prisma.grade.create({
                data: {
                    value,
                    student: { connect: { id: studentId } },
                    subject: { connect: { id: subjectId } },
                    semester: { connect: { id: semesterId } },
                },
                include: {
                    student: true,
                    subject: {
                        include: {
                            class: true,
                        },
                    },
                    semester: true,
                },
            });
            res.status(201).json(newGrade);
        }
    }
    catch (error) {
        console.error("Failed to create or update grade:", error);
        res
            .status(500)
            .json({
            error: "Unable to create or update grade due to an unexpected error.",
        });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createGrade = createGrade;
const getAllGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const grades = yield prisma.grade.findMany({
            include: {
                student: true,
                subject: {
                    include: {
                        class: true,
                    },
                },
                semester: true,
            },
        });
        res.json(grades);
    }
    catch (error) {
        console.error("Failed to retrieve grades:", error);
        res.status(500).json({ error: "Failed to retrieve grades." });
    }
});
exports.getAllGrades = getAllGrades;
const getGradeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const grade = yield prisma.grade.findUnique({
            where: { id },
            include: {
                student: true,
                subject: {
                    include: {
                        class: true,
                    },
                },
                semester: true,
            },
        });
        if (grade) {
            res.json(grade);
        }
        else {
            res.status(404).json({ error: "Grade not found." });
        }
    }
    catch (error) {
        console.error("Failed to retrieve grade:", error);
        res.status(500).json({ error: "Failed to retrieve grade." });
    }
});
exports.getGradeById = getGradeById;
const updateGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { value, studentId, subjectId, semesterId } = req.body;
    try {
        const updatedGrade = yield prisma.grade.update({
            where: { id },
            data: {
                value,
                student: studentId ? { connect: { id: studentId } } : undefined,
                subject: subjectId ? { connect: { id: subjectId } } : undefined,
                semester: semesterId ? { connect: { id: semesterId } } : undefined,
            },
            include: {
                student: true,
                subject: {
                    include: {
                        class: true,
                    },
                },
                semester: true,
            },
        });
        res.json(updatedGrade);
    }
    catch (error) {
        console.error("Failed to update grade:", error);
        res.status(500).json({ error: "Failed to update grade." });
    }
});
exports.updateGrade = updateGrade;
const deleteGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.grade.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        console.error("Failed to delete grade:", error);
        res.status(500).json({ error: "Failed to delete grade." });
    }
});
exports.deleteGrade = deleteGrade;
