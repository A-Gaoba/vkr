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
exports.deleteSubject = exports.updateSubject = exports.getSubjectById = exports.getAllSubjects = exports.assignTeacherToSubject = exports.createSubject = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, classId } = req.body;
    if (!name) {
        res.status(400).json({
            error: "Missing required field: name.",
        });
        return;
    }
    try {
        const existingSubject = yield prisma.subject.findFirst({
            where: {
                name,
                classId: classId || undefined,
            },
        });
        if (existingSubject) {
            res.status(409).json({
                error: `A subject with the name "${name}" for the specified class already exists.`,
            });
            return;
        }
        const newSubject = yield prisma.subject.create({
            data: {
                name,
                description: description || "",
                class: classId ? { connect: { id: classId } } : undefined,
                teacher: undefined,
            },
            include: {
                class: true,
            },
        });
        res.status(201).json(newSubject);
    }
    catch (error) {
        console.error("Failed to create subject:", error);
        res.status(500).json({
            error: "Unable to create subject due to an unexpected error.",
            detailedError: error instanceof Error
                ? error.message
                : "No additional error information available.",
        });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createSubject = createSubject;
const assignTeacherToSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId, teacherId } = req.body;
    if (!subjectId || !teacherId) {
        res.status(400).json({
            error: "Missing required fields: subjectId or teacherId.",
        });
        return;
    }
    try {
        const subject = yield prisma.subject.findUnique({
            where: { id: subjectId },
        });
        if (!subject) {
            res.status(404).json({ error: "Subject not found." });
            return;
        }
        const teacher = yield prisma.teacher.findUnique({
            where: { id: teacherId },
        });
        if (!teacher) {
            res.status(404).json({ error: "Teacher not found." });
            return;
        }
        const updatedSubject = yield prisma.subject.update({
            where: { id: subjectId },
            data: {
                teacher: { connect: { id: teacherId } },
            },
            include: {
                teacher: true,
                class: true,
            },
        });
        res.json(updatedSubject);
    }
    catch (error) {
        console.error("Failed to assign teacher to subject:", error);
        res.status(500).json({
            error: "Unable to assign teacher to subject due to an unexpected error.",
            detailedError: error instanceof Error
                ? error.message
                : "No additional error information available.",
        });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.assignTeacherToSubject = assignTeacherToSubject;
const getAllSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield prisma.subject.findMany({
            include: {
                teacher: true,
                class: true,
            },
        });
        res.json(subjects);
    }
    catch (error) {
        console.error("Failed to retrieve subjects:", error);
        res.status(500).json({ error: "Failed to retrieve subjects." });
    }
});
exports.getAllSubjects = getAllSubjects;
const getSubjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const subject = yield prisma.subject.findUnique({
            where: { id },
            include: {
                teacher: true,
                class: true,
            },
        });
        if (subject) {
            res.json(subject);
        }
        else {
            res.status(404).json({ error: "Subject not found." });
        }
    }
    catch (error) {
        console.error("Failed to retrieve subject:", error);
        res.status(500).json({ error: "Failed to retrieve subject." });
    }
});
exports.getSubjectById = getSubjectById;
const updateSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, description, teacherId, classId } = req.body;
        const existingSubject = yield prisma.subject.findFirst({
            where: {
                id: { not: id },
                name,
                classId: classId || undefined,
            },
        });
        if (existingSubject) {
            res.status(409).json({
                error: `A subject with the name "${name}" for the specified class already exists.`,
            });
            return;
        }
        const updatedSubject = yield prisma.subject.update({
            where: { id },
            data: {
                name,
                description,
                teacher: teacherId
                    ? { connect: { id: parseInt(teacherId) } }
                    : undefined,
                class: classId ? { connect: { id: classId } } : undefined,
            },
            include: {
                teacher: true,
                class: true,
            },
        });
        res.json(updatedSubject);
    }
    catch (error) {
        console.error("Failed to update subject:", error);
        res.status(500).json({
            error: "Failed to update subject due to an unexpected error.",
            detailedError: error instanceof Error
                ? error.message
                : "No additional error information available.",
        });
    }
});
exports.updateSubject = updateSubject;
const deleteSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield prisma.subject.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        console.error("Failed to delete subject:", error);
        res.status(500).json({
            error: "Failed to delete subject due to an unexpected error.",
            detailedError: error instanceof Error
                ? error.message
                : "No additional error information available.",
        });
    }
});
exports.deleteSubject = deleteSubject;
