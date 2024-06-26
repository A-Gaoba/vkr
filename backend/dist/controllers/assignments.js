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
exports.assignTeachersToClasses = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const assignTeachersToClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { classId, teacherIds } = req.body;
    if (!classId || !Array.isArray(teacherIds)) {
        return res.status(400).json({ error: 'classId and teacherIds are required and teacherIds should be an array' });
    }
    try {
        yield prisma.classTeacher.createMany({
            data: teacherIds.map((teacherId) => ({
                classId,
                teacherId,
            })),
            skipDuplicates: true,
        });
        res.status(200).json({ message: 'Teachers assigned to class successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while assigning teachers to class' });
    }
});
exports.assignTeachersToClasses = assignTeachersToClasses;
