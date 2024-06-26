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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getAllStudents = exports.createStudent = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, middleName, lastName, gender = "OTHER", // Default to "OTHER" if gender is not provided
    dateOfBirth, email, phoneNumber, address, city, image, password, classId, } = req.body;
    console.log("Incoming request body:", req.body);
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            error: "Missing required fields: firstName, lastName, email, or password.",
        });
    }
    try {
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res
                .status(409)
                .json({ error: "A user with this email already exists." });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const student = yield prisma.student.create({
            data: {
                firstName,
                middleName: middleName || "",
                lastName,
                gender,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                email,
                phoneNumber,
                address,
                city,
                image: image || null,
                user: {
                    create: {
                        username: email,
                        email,
                        password: hashedPassword,
                        role: "STUDENT",
                        verified: false,
                    },
                },
                class: classId ? { connect: { id: classId } } : undefined,
            },
            include: {
                user: true,
                class: true,
            },
        });
        console.log("Student created successfully:", student);
        return res.status(201).json(student);
    }
    catch (error) {
        console.error("Failed to create student:", error);
        if (error instanceof Error) {
            console.error("Error details:", error.message);
        }
        return res.status(500).json({
            error: "Unable to create student due to an unexpected error.",
            detailedError: error instanceof Error
                ? error.message
                : "No additional error information available.",
        });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createStudent = createStudent;
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield prisma.student.findMany({
            include: {
                user: true,
                class: true,
            },
        });
        res.json(students);
    }
    catch (error) {
        console.error("Failed to retrieve students:", error);
        res.status(500).json({ error: "Failed to retrieve students." });
    }
});
exports.getAllStudents = getAllStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const student = yield prisma.student.findUnique({
            where: { id },
            include: {
                user: true,
                class: true,
            },
        });
        if (student) {
            res.json(student);
        }
        else {
            res.status(404).json({ error: "Student not found." });
        }
    }
    catch (error) {
        console.error("Failed to retrieve student:", error);
        res.status(500).json({ error: "Failed to retrieve student." });
    }
});
exports.getStudentById = getStudentById;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const _a = req.body, { email, password, classId } = _a, data = __rest(_a, ["email", "password", "classId"]);
        if (email) {
            res
                .status(400)
                .json({ error: "Changing email is not allowed via this method." });
            return;
        }
        const updatedStudent = yield prisma.student.update({
            where: { id },
            data: Object.assign(Object.assign({}, data), { class: classId ? { connect: { id: classId } } : undefined, user: {
                    update: {
                        password: password ? yield bcrypt_1.default.hash(password, 10) : undefined,
                    },
                } }),
            include: {
                user: true,
                class: true,
            },
        });
        res.json(updatedStudent);
    }
    catch (error) {
        console.error("Failed to update student:", error);
        res.status(500).json({ error: "Failed to update student." });
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            // Delete related enrollments
            yield prisma.enrollment.deleteMany({
                where: { studentId: id },
            });
            // Delete related attendances
            yield prisma.attendance.deleteMany({
                where: { studentId: id },
            });
            // Delete related grades
            yield prisma.grade.deleteMany({
                where: { studentId: id },
            });
            // Delete the student and capture the userId
            const student = yield prisma.student.delete({
                where: { id },
                select: { userId: true },
            });
            // Delete the user associated with the student
            yield prisma.user.delete({
                where: { id: student.userId },
            });
        }));
        res.status(204).send();
    }
    catch (error) {
        console.error("Failed to delete student:", error);
        res
            .status(500)
            .json({ error: "Failed to delete student.", details: error.message });
    }
});
exports.deleteStudent = deleteStudent;
