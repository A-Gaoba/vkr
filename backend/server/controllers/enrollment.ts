import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createEnrollment = async (req: Request, res: Response): Promise<void> => {
  const { studentId, subjectId, semesterId } = req.body;

  if (!studentId || !subjectId || !semesterId) {
    res.status(400).json({ error: "Missing required fields: studentId, subjectId, or semesterId." });
    return;
  }

  try {
    const newEnrollment = await prisma.enrollment.create({
      data: {
        student: { connect: { id: studentId } },
        subject: { connect: { id: subjectId } },
        semester: { connect: { id: semesterId } },
      },
      include: {
        student: true,
        subject: true,
        semester: true,
      },
    });
    res.status(201).json(newEnrollment);
  } catch (error) {
    console.error("Failed to create enrollment:", error);
    res.status(500).json({ error: "Unable to create enrollment due to an unexpected error." });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllEnrollments = async (req: Request, res: Response): Promise<void> => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        student: true,
        subject: true,
        semester: true,
      },
    });
    res.json(enrollments);
  } catch (error) {
    console.error("Failed to retrieve enrollments:", error);
    res.status(500).json({ error: "Failed to retrieve enrollments." });
  }
};

export const getEnrollmentById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: true,
        subject: true,
        semester: true,
      },
    });
    if (enrollment) {
      res.json(enrollment);
    } else {
      res.status(404).json({ error: "Enrollment not found." });
    }
  } catch (error) {
    console.error("Failed to retrieve enrollment:", error);
    res.status(500).json({ error: "Failed to retrieve enrollment." });
  }
};

export const updateEnrollment = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const { studentId, subjectId, semesterId } = req.body;

  try {
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        student: studentId ? { connect: { id: studentId } } : undefined,
        subject: subjectId ? { connect: { id: subjectId } } : undefined,
        semester: semesterId ? { connect: { id: semesterId } } : undefined,
      },
      include: {
        student: true,
        subject: true,
        semester: true,
      },
    });
    res.json(updatedEnrollment);
  } catch (error) {
    console.error("Failed to update enrollment:", error);
    res.status(500).json({ error: "Failed to update enrollment." });
  }
};

export const deleteEnrollment = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    await prisma.enrollment.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete enrollment:", error);
    res.status(500).json({ error: "Failed to delete enrollment." });
  }
};
