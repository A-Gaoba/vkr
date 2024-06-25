import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createGrade = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { value, studentId, subjectId, semesterId } = req.body;

  if (value === undefined || !studentId || !subjectId || !semesterId) {
    res.status(400).json({
      error:
        "Missing required fields: value, studentId, subjectId, or semesterId.",
    });
    return;
  }

  try {
    // Check if the grade already exists
    const existingGrade = await prisma.grade.findFirst({
      where: {
        studentId,
        subjectId,
        semesterId,
      },
    });

    if (existingGrade) {
      // Update the existing grade
      const updatedGrade = await prisma.grade.update({
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
    } else {
      // Create a new grade
      const newGrade = await prisma.grade.create({
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
  } catch (error) {
    console.error("Failed to create or update grade:", error);
    res
      .status(500)
      .json({
        error: "Unable to create or update grade due to an unexpected error.",
      });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllGrades = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const grades = await prisma.grade.findMany({
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
  } catch (error) {
    console.error("Failed to retrieve grades:", error);
    res.status(500).json({ error: "Failed to retrieve grades." });
  }
};

export const getGradeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    const grade = await prisma.grade.findUnique({
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
    } else {
      res.status(404).json({ error: "Grade not found." });
    }
  } catch (error) {
    console.error("Failed to retrieve grade:", error);
    res.status(500).json({ error: "Failed to retrieve grade." });
  }
};

export const updateGrade = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const { value, studentId, subjectId, semesterId } = req.body;

  try {
    const updatedGrade = await prisma.grade.update({
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
  } catch (error) {
    console.error("Failed to update grade:", error);
    res.status(500).json({ error: "Failed to update grade." });
  }
};

export const deleteGrade = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    await prisma.grade.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete grade:", error);
    res.status(500).json({ error: "Failed to delete grade." });
  }
};
