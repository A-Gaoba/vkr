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
exports.getGraduatedStudents = exports.graduateStudent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const graduateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.id, 10);
    try {
        // Insert student ID into the GraduatedStudents table
        yield prisma.graduatedStudents.create({
            data: {
                studentId: studentId,
            },
        });
        return res.status(200).json({ message: "Student graduated successfully." });
    }
    catch (error) {
        console.error("Failed to graduate student:", error);
        return res.status(500).json({ error: "Failed to graduate student." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.graduateStudent = graduateStudent;
const getGraduatedStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the list of graduated students
        const graduatedStudentRecords = yield prisma.graduatedStudents.findMany();
        // Extract student IDs
        const studentIds = graduatedStudentRecords.map((record) => record.studentId);
        // Fetch detailed student information for each graduated student
        const graduatedStudents = yield prisma.student.findMany({
            where: { id: { in: studentIds } },
            include: {
                user: true,
                class: true,
            },
        });
        res.json(graduatedStudents);
    }
    catch (error) {
        console.error("Failed to retrieve graduated students:", error);
        res.status(500).json({ error: "Failed to retrieve graduated students." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getGraduatedStudents = getGraduatedStudents;
