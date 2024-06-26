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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassSemesters = exports.getClassSubjects = exports.getClassTeachers = exports.getClassStudents = exports.deleteClass = exports.updateClass = exports.getClassById = exports.getAllClasses = exports.createClass = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, level, description, subjects, teacherIds, studentIds } = req.body;
    console.log("Incoming request body:", req.body);
    if (!name || !level) {
        return res.status(400).json({
            error: "Missing required fields: name or level.",
        });
    }
    try {
        // Check if a class with the same name and level already exists
        const existingClass = yield prisma.class.findFirst({
            where: { name, level },
        });
        if (existingClass) {
            return res.status(409).json({
                error: `A class with the name "${name}" at level "${level}" already exists.`,
            });
        }
        // Validate teacher IDs
        if (teacherIds) {
            const teachers = yield prisma.teacher.findMany({
                where: {
                    id: {
                        in: teacherIds,
                    },
                },
            });
            if (teachers.length !== teacherIds.length) {
                return res.status(400).json({
                    error: "One or more teacher IDs are invalid.",
                });
            }
        }
        const newClass = yield prisma.class.create({
            data: {
                name,
                level,
                description: description || "",
                subjects: {
                    connect: subjects ? subjects.map((subjectId) => ({ id: subjectId })) : [],
                },
                students: {
                    connect: studentIds ? studentIds.map((studentId) => ({ id: studentId })) : [],
                },
                ClassTeacher: {
                    create: teacherIds
                        ? teacherIds.map((teacherId) => ({
                            teacher: { connect: { id: teacherId } },
                        }))
                        : [],
                },
            },
            include: {
                subjects: true,
                students: true,
                ClassTeacher: {
                    include: {
                        teacher: true,
                    },
                },
            },
        });
        console.log("Class created successfully:", newClass);
        return res.status(201).json(newClass);
    }
    catch (error) {
        console.error("Failed to create class:", error);
        return res.status(500).json({
            error: "Unable to create class due to an unexpected error.",
            detailedError: error instanceof Error ? error.message : "No additional error information available.",
        });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createClass = createClass;
const getAllClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classes = yield prisma.class.findMany({
            include: {
                subjects: true,
                students: true,
                ClassTeacher: {
                    include: {
                        teacher: true,
                    },
                },
            },
        });
        res.json(classes);
    }
    catch (error) {
        console.error("Failed to retrieve classes:", error);
        res.status(500).json({ error: "Failed to retrieve classes." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getAllClasses = getAllClasses;
const getClassById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const classData = yield prisma.class.findUnique({
            where: { id },
            include: {
                subjects: true,
                students: true,
                ClassTeacher: {
                    include: {
                        teacher: true,
                    },
                },
            },
        });
        if (classData) {
            res.json(classData);
        }
        else {
            res.status(404).json({ error: "Class not found." });
        }
    }
    catch (error) {
        console.error("Failed to retrieve class:", error);
        res.status(500).json({ error: "Failed to retrieve class." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getClassById = getClassById;
const updateClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const _a = req.body, { subjects, teacherIds, studentIds } = _a, data = __rest(_a, ["subjects", "teacherIds", "studentIds"]);
        const updatedClass = yield prisma.class.update({
            where: { id },
            data: Object.assign(Object.assign({}, data), { subjects: {
                    set: subjects ? subjects.map((subjectId) => ({ id: subjectId })) : [],
                }, students: {
                    set: studentIds ? studentIds.map((studentId) => ({ id: studentId })) : [],
                }, ClassTeacher: {
                    deleteMany: {},
                    create: teacherIds
                        ? teacherIds.map((teacherId) => ({
                            teacher: { connect: { id: teacherId } },
                        }))
                        : [],
                } }),
            include: {
                subjects: true,
                students: true,
                ClassTeacher: {
                    include: {
                        teacher: true,
                    },
                },
            },
        });
        res.json(updatedClass);
    }
    catch (error) {
        console.error("Failed to update class:", error);
        res.status(500).json({ error: "Failed to update class." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.updateClass = updateClass;
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            // Disconnect subjects associated with the class
            const disconnectedSubjects = yield prisma.subject.updateMany({
                where: { classId: id },
                data: { classId: null },
            });
            console.log(`Disconnected subjects from class ${id}:`, disconnectedSubjects);
            // Disconnect students associated with the class
            const disconnectedStudents = yield prisma.student.updateMany({
                where: { classId: id },
                data: { classId: null },
            });
            console.log(`Disconnected students from class ${id}:`, disconnectedStudents);
            // Delete all ClassTeacher associations
            const deletedClassTeachers = yield prisma.classTeacher.deleteMany({
                where: { classId: id },
            });
            console.log(`Deleted ClassTeacher associations for class ${id}:`, deletedClassTeachers);
            // Delete related schedules
            const deletedSchedules = yield prisma.schedule.deleteMany({
                where: { classId: id },
            });
            console.log(`Deleted schedules for class ${id}:`, deletedSchedules);
            // Delete related attendances
            const deletedAttendances = yield prisma.attendance.deleteMany({
                where: { classId: id },
            });
            console.log(`Deleted attendances for class ${id}:`, deletedAttendances);
            // Finally, delete the class
            const deletedClass = yield prisma.class.delete({
                where: { id },
            });
            console.log(`Deleted class ${id}:`, deletedClass);
        }));
        res.status(204).send();
    }
    catch (error) {
        console.error("Failed to delete class:", error);
        // Check for specific error types or constraints
        if (error.code === "P2003") {
            // Foreign key constraint failure
            res.status(400).json({ error: "Cannot delete class due to foreign key constraints." });
        }
        else if (error instanceof Error) {
            res.status(500).json({ error: `Failed to delete class: ${error.message}` });
        }
        else {
            res.status(500).json({ error: "Failed to delete class due to an unknown error." });
        }
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.deleteClass = deleteClass;
const getClassStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const classWithStudents = yield prisma.class.findUnique({
            where: { id },
            include: {
                students: true,
            },
        });
        if (!classWithStudents) {
            return res.status(404).json({ error: "Class not found." });
        }
        return res.json(classWithStudents.students);
    }
    catch (error) {
        console.error("Failed to retrieve students for the class:", error);
        return res.status(500).json({ error: "Failed to retrieve students for the class." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getClassStudents = getClassStudents;
const getClassTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const classWithTeachers = yield prisma.class.findUnique({
            where: { id },
            include: {
                ClassTeacher: {
                    include: {
                        teacher: true,
                    },
                },
            },
        });
        if (!classWithTeachers) {
            return res.status(404).json({ error: "Class not found." });
        }
        const teachers = classWithTeachers.ClassTeacher.map(ct => ct.teacher);
        return res.json(teachers);
    }
    catch (error) {
        console.error("Failed to retrieve teachers for the class:", error);
        return res.status(500).json({ error: "Failed to retrieve teachers for the class." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getClassTeachers = getClassTeachers;
const getClassSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const classWithSubjects = yield prisma.class.findUnique({
            where: { id },
            include: {
                subjects: true,
            },
        });
        if (!classWithSubjects) {
            return res.status(404).json({ error: "Class not found." });
        }
        return res.json(classWithSubjects.subjects);
    }
    catch (error) {
        console.error("Failed to retrieve subjects for the class:", error);
        return res.status(500).json({ error: "Failed to retrieve subjects for the class." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getClassSubjects = getClassSubjects;
const getClassSemesters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const semesters = yield prisma.semester.findMany({
            where: {
                semesterClasses: {
                    some: {
                        classId: id,
                    },
                },
            },
        });
        if (!semesters.length) {
            return res.status(404).json({ error: "Semesters not found for this class." });
        }
        return res.json(semesters);
    }
    catch (error) {
        console.error("Failed to retrieve semesters for the class:", error);
        return res.status(500).json({ error: "Failed to retrieve semesters for the class." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.getClassSemesters = getClassSemesters;
