import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSemester = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { term, year, startDate, endDate } = req.body;

    if (!term || !year || !startDate || !endDate) {
      res
        .status(400)
        .json({
          error: "Missing required fields: term, year, startDate, or endDate.",
        });
      return;
    }

    const semester = await prisma.semester.create({
      data: {
        term,
        year,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.status(201).json(semester);
  } catch (err) {
    const error = err as Error;
    console.error("Failed to create semester:", error);
    res
      .status(500)
      .json({
        error: `Unable to create semester due to an unexpected error: ${error.message}`,
      });
  }
};

export const getAllSemesters = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const semesters = await prisma.semester.findMany();
    res.json(semesters);
  } catch (err) {
    const error = err as Error;
    console.error("Failed to retrieve semesters:", error);
    res
      .status(500)
      .json({ error: `Failed to retrieve semesters: ${error.message}` });
  }
};

export const getSemesterById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const semester = await prisma.semester.findUnique({
      where: { id },
    });
    if (semester) {
      res.json(semester);
    } else {
      res.status(404).json({ error: "Semester not found." });
    }
  } catch (err) {
    const error = err as Error;
    console.error("Failed to retrieve semester:", error);
    res
      .status(500)
      .json({ error: `Failed to retrieve semester: ${error.message}` });
  }
};

export const updateSemester = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { term, year, startDate, endDate } = req.body;

    const semester = await prisma.semester.findUnique({ where: { id } });
    if (!semester) {
      res.status(404).json({ error: "Semester not found." });
      return;
    }

    const updatedSemester = await prisma.semester.update({
      where: { id },
      data: {
        term: term !== undefined ? term : semester.term,
        year: year !== undefined ? year : semester.year,
        startDate:
          startDate !== undefined ? new Date(startDate) : semester.startDate,
        endDate: endDate !== undefined ? new Date(endDate) : semester.endDate,
      },
    });

    res.json(updatedSemester);
  } catch (err) {
    const error = err as Error;
    console.error("Failed to update semester:", error);
    res
      .status(500)
      .json({ error: `Failed to update semester: ${error.message}` });
  }
};

export const deleteSemester = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await prisma.semester.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    const error = err as Error;
    console.error("Failed to delete semester:", error);
    res
      .status(500)
      .json({ error: `Failed to delete semester: ${error.message}` });
  }
};
