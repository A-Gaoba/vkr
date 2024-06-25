import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const assignTeachersToClasses = async (req: Request, res: Response) => {
  const { classId, teacherIds } = req.body;

  if (!classId || !Array.isArray(teacherIds)) {
    return res.status(400).json({ error: 'classId and teacherIds are required and teacherIds should be an array' });
  }

  try {
    await prisma.classTeacher.createMany({
      data: teacherIds.map((teacherId: number) => ({
        classId,
        teacherId,
      })),
      skipDuplicates: true,
    });
    res.status(200).json({ message: 'Teachers assigned to class successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while assigning teachers to class' });
  }
};
