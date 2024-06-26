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
exports.deleteTeacher = exports.updateTeacher = exports.getTeacherById = exports.getAllTeachers = exports.createTeacher = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
// export const createTeacher = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const {
//     firstName,
//     middleName,
//     lastName,
//     gender = "OTHER",
//     dateOfBirth,
//     email,
//     phone,
//     bio,
//     yearsOfExperience,
//     password,
//     subjectsTaught,
//   } = req.body;
//   console.log("Incoming request body:", req.body);
//   if (!firstName || !lastName || !email || !password) {
//     return res.status(400).json({
//       error:
//         "Missing required fields: firstName, lastName, email, password, or gender.",
//     });
//   }
//   try {
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ error: "A user with this email already exists." });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const teacher = await prisma.teacher.create({
//       data: {
//         firstName,
//         middleName: middleName || "",
//         lastName,
//         gender,
//         dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
//         email,
//         phone: phone || null,
//         bio: bio || null,
//         yearsOfExperience: parseInt(yearsOfExperience, 10) || 0,
//         user: {
//           create: {
//             username: email,
//             email,
//             password: hashedPassword,
//             role: "TEACHER",
//             verified: false,
//           },
//         },
//         subjects: {
//           connect: subjectsTaught
//             ? subjectsTaught.map((subjectId: number) => ({ id: subjectId }))
//             : [],
//         },
//       },
//       include: {
//         user: true,
//         subjects: true,
//       },
//     });
//     console.log("Teacher created successfully:", teacher);
//     return res.status(201).json(teacher);
//   } catch (error) {
//     console.error("Failed to create teacher:", error);
//     if (error instanceof Error) {
//       console.error("Error details:", error.message);
//     }
//     return res.status(500).json({
//       error: "Unable to create teacher due to an unexpected error.",
//       detailedError:
//         error instanceof Error
//           ? error.message
//           : "No additional error information available.",
//     });
//   } finally {
//     await prisma.$disconnect();
//   }
// };
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, middleName, lastName, gender = "OTHER", dateOfBirth, email, phone, bio, yearsOfExperience, password, subjectsTaught, classId, // Ensure this field is included
     } = req.body;
    console.log("Incoming request body:", req.body);
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            error: "Missing required fields: firstName, lastName, email, password.",
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
        const teacher = yield prisma.teacher.create({
            data: {
                firstName,
                middleName: middleName || "",
                lastName,
                gender,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                email,
                phone: phone || null,
                bio: bio || null,
                yearsOfExperience: parseInt(yearsOfExperience, 10) || 0,
                user: {
                    create: {
                        username: email,
                        email,
                        password: hashedPassword,
                        role: "TEACHER",
                        verified: false,
                    },
                },
                subjects: {
                    connect: subjectsTaught
                        ? subjectsTaught.map((subjectId) => ({ id: subjectId }))
                        : [],
                },
                classes: classId
                    ? {
                        create: [
                            {
                                class: {
                                    connect: { id: parseInt(classId, 10) }, // Ensure classId is an integer
                                },
                            },
                        ],
                    }
                    : undefined,
            },
            include: {
                user: true,
                subjects: true,
                classes: true,
            },
        });
        console.log("Teacher created successfully:", teacher);
        return res.status(201).json(teacher);
    }
    catch (error) {
        console.error("Failed to create teacher:", error);
        if (error instanceof Error) {
            console.error("Error details:", error.message);
        }
        return res.status(500).json({
            error: "Unable to create teacher due to an unexpected error.",
            detailedError: error instanceof Error
                ? error.message
                : "No additional error information available.",
        });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.createTeacher = createTeacher;
const getAllTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teachers = yield prisma.teacher.findMany({
            include: {
                user: true,
                subjects: true,
                classes: true,
            },
        });
        res.json(teachers);
    }
    catch (error) {
        console.error("Failed to retrieve teachers:", error);
        res.status(500).json({ error: "Failed to retrieve teachers." });
    }
});
exports.getAllTeachers = getAllTeachers;
const getTeacherById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const teacher = yield prisma.teacher.findUnique({
            where: { id },
            include: {
                user: true,
                subjects: true,
                classes: true,
            },
        });
        if (teacher) {
            res.json(teacher);
        }
        else {
            res.status(404).json({ error: "Teacher not found." });
        }
    }
    catch (error) {
        console.error("Failed to retrieve teacher:", error);
        res.status(500).json({ error: "Failed to retrieve teacher." });
    }
});
exports.getTeacherById = getTeacherById;
const updateTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const _a = req.body, { email, password } = _a, data = __rest(_a, ["email", "password"]);
        if (email) {
            res
                .status(400)
                .json({ error: "Changing email is not allowed via this method." });
            return;
        }
        const updatedTeacher = yield prisma.teacher.update({
            where: { id },
            data: Object.assign(Object.assign({}, data), { user: {
                    update: {
                        password: password ? yield bcrypt_1.default.hash(password, 10) : undefined,
                    },
                } }),
            include: {
                user: true,
            },
        });
        res.json(updatedTeacher);
    }
    catch (error) {
        console.error("Failed to update teacher:", error);
        res.status(500).json({ error: "Failed to update teacher." });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.updateTeacher = updateTeacher;
const deleteTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            // Delete ClassTeacher relations
            yield prisma.classTeacher.deleteMany({
                where: { teacherId: id },
            });
            // Update related subjects to remove the teacher
            yield prisma.subject.updateMany({
                where: { teacherId: id },
                data: { teacherId: null },
            });
            // Delete the teacher and capture the userId
            const teacher = yield prisma.teacher.delete({
                where: { id },
                select: { userId: true },
            });
            // Delete the user associated with the teacher
            yield prisma.user.delete({
                where: { id: teacher.userId },
            });
        }));
        res.status(204).send();
    }
    catch (error) {
        console.error("Failed to delete teacher:", error);
        res
            .status(500)
            .json({ error: "Failed to delete teacher.", details: error.message });
    }
});
exports.deleteTeacher = deleteTeacher;
