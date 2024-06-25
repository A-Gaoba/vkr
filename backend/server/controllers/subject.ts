import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createSubject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, classId } = req.body;

  if (!name) {
    res.status(400).json({
      error: "Missing required field: name.",
    });
    return;
  }

  try {
    const existingSubject = await prisma.subject.findFirst({
      where: {
        name,
        classId: classId || undefined,
      },
    });

    if (existingSubject) {
      res.status(409).json({
        error: `A subject with the name "${name}" for the specified class already exists.`,
      });
      return;
    }

    const newSubject = await prisma.subject.create({
      data: {
        name,
        description: description || "",
        class: classId ? { connect: { id: classId } } : undefined,
        teacher: undefined,
      },
      include: {
        class: true,
      },
    });

    res.status(201).json(newSubject);
  } catch (error) {
    console.error("Failed to create subject:", error);
    res.status(500).json({
      error: "Unable to create subject due to an unexpected error.",
      detailedError:
        error instanceof Error
          ? error.message
          : "No additional error information available.",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const assignTeacherToSubject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { subjectId, teacherId } = req.body;

  if (!subjectId || !teacherId) {
    res.status(400).json({
      error: "Missing required fields: subjectId or teacherId.",
    });
    return;
  }

  try {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      res.status(404).json({ error: "Subject not found." });
      return;
    }

    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      res.status(404).json({ error: "Teacher not found." });
      return;
    }

    const updatedSubject = await prisma.subject.update({
      where: { id: subjectId },
      data: {
        teacher: { connect: { id: teacherId } },
      },
      include: {
        teacher: true,
        class: true,
      },
    });

    res.json(updatedSubject);
  } catch (error) {
    console.error("Failed to assign teacher to subject:", error);
    res.status(500).json({
      error: "Unable to assign teacher to subject due to an unexpected error.",
      detailedError:
        error instanceof Error
          ? error.message
          : "No additional error information available.",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllSubjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        teacher: true,
        class: true,
      },
    });
    res.json(subjects);
  } catch (error) {
    console.error("Failed to retrieve subjects:", error);
    res.status(500).json({ error: "Failed to retrieve subjects." });
  }
};

export const getSubjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const subject = await prisma.subject.findUnique({
      where: { id },
      include: {
        teacher: true,
        class: true,
      },
    });
    if (subject) {
      res.json(subject);
    } else {
      res.status(404).json({ error: "Subject not found." });
    }
  } catch (error) {
    console.error("Failed to retrieve subject:", error);
    res.status(500).json({ error: "Failed to retrieve subject." });
  }
};

export const updateSubject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, teacherId, classId } = req.body;

    const existingSubject = await prisma.subject.findFirst({
      where: {
        id: { not: id },
        name,
        classId: classId || undefined,
      },
    });

    if (existingSubject) {
      res.status(409).json({
        error: `A subject with the name "${name}" for the specified class already exists.`,
      });
      return;
    }

    const updatedSubject = await prisma.subject.update({
      where: { id },
      data: {
        name,
        description,
        teacher: teacherId
          ? { connect: { id: parseInt(teacherId) } }
          : undefined,
        class: classId ? { connect: { id: classId } } : undefined,
      },
      include: {
        teacher: true,
        class: true,
      },
    });

    res.json(updatedSubject);
  } catch (error) {
    console.error("Failed to update subject:", error);
    res.status(500).json({
      error: "Failed to update subject due to an unexpected error.",
      detailedError:
        error instanceof Error
          ? error.message
          : "No additional error information available.",
    });
  }
};

export const deleteSubject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await prisma.subject.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete subject:", error);
    res.status(500).json({
      error: "Failed to delete subject due to an unexpected error.",
      detailedError:
        error instanceof Error
          ? error.message
          : "No additional error information available.",
    });
  }
};
