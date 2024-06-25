import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createAttendance = async (req: Request, res: Response): Promise<void> => {
  const { studentId, classId, date, status } = req.body;

  if (!studentId || !classId || !date || !status) {
    res.status(400).json({ error: "Missing required fields: studentId, classId, date, or status." });
    return;
  }

  try {
    const newAttendance = await prisma.attendance.create({
      data: {
        student: { connect: { id: studentId } },
        class: { connect: { id: classId } },
        date: new Date(date),
        status,
      },
      include: {
        student: true,
        class: true,
      },
    });
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error("Failed to create attendance:", error);
    res.status(500).json({ error: "Unable to create attendance due to an unexpected error." });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllAttendances = async (req: Request, res: Response): Promise<void> => {
  try {
    const attendances = await prisma.attendance.findMany({
      include: {
        student: true,
        class: true,
      },
    });
    res.json(attendances);
  } catch (error) {
    console.error("Failed to retrieve attendances:", error);
    res.status(500).json({ error: "Failed to retrieve attendances." });
  }
};

export const getAttendanceById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    const attendance = await prisma.attendance.findUnique({
      where: { id },
      include: {
        student: true,
        class: true,
      },
    });
    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ error: "Attendance not found." });
    }
  } catch (error) {
    console.error("Failed to retrieve attendance:", error);
    res.status(500).json({ error: "Failed to retrieve attendance." });
  }
};

export const updateAttendance = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const { studentId, classId, date, status } = req.body;

  try {
    const updatedAttendance = await prisma.attendance.update({
      where: { id },
      data: {
        student: studentId ? { connect: { id: studentId } } : undefined,
        class: classId ? { connect: { id: classId } } : undefined,
        date: date ? new Date(date) : undefined,
        status,
      },
      include: {
        student: true,
        class: true,
      },
    });
    res.json(updatedAttendance);
  } catch (error) {
    console.error("Failed to update attendance:", error);
    res.status(500).json({ error: "Failed to update attendance." });
  }
};

export const deleteAttendance = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    await prisma.attendance.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete attendance:", error);
    res.status(500).json({ error: "Failed to delete attendance." });
  }
};
