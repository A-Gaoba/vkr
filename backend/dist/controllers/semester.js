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
exports.deleteSemester = exports.updateSemester = exports.getSemesterById = exports.getAllSemesters = exports.createSemester = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSemester = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { term, year, startDate, endDate } = req.body;
        if (!term || !year || !startDate || !endDate) {
            res
                .status(400)
                .json({
                error: "Missing required fields: term, year, startDate, or endDate.",
            });
            return;
        }
        const semester = yield prisma.semester.create({
            data: {
                term,
                year,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },
        });
        res.status(201).json(semester);
    }
    catch (err) {
        const error = err;
        console.error("Failed to create semester:", error);
        res
            .status(500)
            .json({
            error: `Unable to create semester due to an unexpected error: ${error.message}`,
        });
    }
});
exports.createSemester = createSemester;
const getAllSemesters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const semesters = yield prisma.semester.findMany();
        res.json(semesters);
    }
    catch (err) {
        const error = err;
        console.error("Failed to retrieve semesters:", error);
        res
            .status(500)
            .json({ error: `Failed to retrieve semesters: ${error.message}` });
    }
});
exports.getAllSemesters = getAllSemesters;
const getSemesterById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const semester = yield prisma.semester.findUnique({
            where: { id },
        });
        if (semester) {
            res.json(semester);
        }
        else {
            res.status(404).json({ error: "Semester not found." });
        }
    }
    catch (err) {
        const error = err;
        console.error("Failed to retrieve semester:", error);
        res
            .status(500)
            .json({ error: `Failed to retrieve semester: ${error.message}` });
    }
});
exports.getSemesterById = getSemesterById;
const updateSemester = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { term, year, startDate, endDate } = req.body;
        const semester = yield prisma.semester.findUnique({ where: { id } });
        if (!semester) {
            res.status(404).json({ error: "Semester not found." });
            return;
        }
        const updatedSemester = yield prisma.semester.update({
            where: { id },
            data: {
                term: term !== undefined ? term : semester.term,
                year: year !== undefined ? year : semester.year,
                startDate: startDate !== undefined ? new Date(startDate) : semester.startDate,
                endDate: endDate !== undefined ? new Date(endDate) : semester.endDate,
            },
        });
        res.json(updatedSemester);
    }
    catch (err) {
        const error = err;
        console.error("Failed to update semester:", error);
        res
            .status(500)
            .json({ error: `Failed to update semester: ${error.message}` });
    }
});
exports.updateSemester = updateSemester;
const deleteSemester = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield prisma.semester.delete({ where: { id } });
        res.status(204).send();
    }
    catch (err) {
        const error = err;
        console.error("Failed to delete semester:", error);
        res
            .status(500)
            .json({ error: `Failed to delete semester: ${error.message}` });
    }
});
exports.deleteSemester = deleteSemester;
