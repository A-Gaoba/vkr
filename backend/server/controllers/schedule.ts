import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { dayOfWeek, startTime, endTime, classId, subjectId, semesterId } =
    req.body;

  if (
    !dayOfWeek ||
    !startTime ||
    !endTime ||
    !classId ||
    !subjectId ||
    !semesterId
  ) {
    res
      .status(400)
      .json({
        error:
          "Missing required fields: dayOfWeek, startTime, endTime, classId, subjectId, or semesterId.",
      });
    return;
  }

  try {
    const newSchedule = await prisma.schedule.create({
      data: {
        dayOfWeek,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        class: { connect: { id: classId } },
        subject: { connect: { id: subjectId } },
        semester: { connect: { id: semesterId } },
      },
      include: {
        class: true,
        subject: true,
        semester: true,
      },
    });
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error("Failed to create schedule:", error);
    res
      .status(500)
      .json({ error: "Unable to create schedule due to an unexpected error." });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllSchedules = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const schedules = await prisma.schedule.findMany({
      include: {
        class: true,
        subject: true,
        semester: true,
      },
    });
    res.json(schedules);
  } catch (error) {
    console.error("Failed to retrieve schedules:", error);
    res.status(500).json({ error: "Failed to retrieve schedules." });
  }
};

export const getScheduleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id },
      include: {
        class: true,
        subject: true,
        semester: true,
      },
    });
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ error: "Schedule not found." });
    }
  } catch (error) {
    console.error("Failed to retrieve schedule:", error);
    res.status(500).json({ error: "Failed to retrieve schedule." });
  }
};

export const updateSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const { dayOfWeek, startTime, endTime, classId, subjectId, semesterId } =
    req.body;

  try {
    const updatedSchedule = await prisma.schedule.update({
      where: { id },
      data: {
        dayOfWeek,
        startTime: startTime ? new Date(startTime) : undefined,
        endTime: endTime ? new Date(endTime) : undefined,
        class: classId ? { connect: { id: classId } } : undefined,
        subject: subjectId ? { connect: { id: subjectId } } : undefined,
        semester: semesterId ? { connect: { id: semesterId } } : undefined,
      },
      include: {
        class: true,
        subject: true,
        semester: true,
      },
    });
    res.json(updatedSchedule);
  } catch (error) {
    console.error("Failed to update schedule:", error);
    res.status(500).json({ error: "Failed to update schedule." });
  }
};

export const deleteSchedule = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    await prisma.schedule.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete schedule:", error);
    res.status(500).json({ error: "Failed to delete schedule." });
  }
};
