import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const graduateStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const studentId = parseInt(req.params.id, 10);

  try {
    // Insert student ID into the GraduatedStudents table
    await prisma.graduatedStudents.create({
      data: {
        studentId: studentId,
      },
    });

    return res.status(200).json({ message: "Student graduated successfully." });
  } catch (error) {
    console.error("Failed to graduate student:", error);
    return res.status(500).json({ error: "Failed to graduate student." });
  } finally {
    await prisma.$disconnect();
  }
};

export const getGraduatedStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch the list of graduated students
    const graduatedStudentRecords = await prisma.graduatedStudents.findMany();

    // Extract student IDs
    const studentIds = graduatedStudentRecords.map(
      (record) => record.studentId
    );

    // Fetch detailed student information for each graduated student
    const graduatedStudents = await prisma.student.findMany({
      where: { id: { in: studentIds } },
      include: {
        user: true,
        class: true,
      },
    });

    res.json(graduatedStudents);
  } catch (error) {
    console.error("Failed to retrieve graduated students:", error);
    res.status(500).json({ error: "Failed to retrieve graduated students." });
  } finally {
    await prisma.$disconnect();
  }
};
