import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, level, description, subjects, teacherIds, studentIds } = req.body;

  console.log("Incoming request body:", req.body);

  if (!name || !level) {
    return res.status(400).json({
      error: "Missing required fields: name or level.",
    });
  }

  try {
    // Check if a class with the same name and level already exists
    const existingClass = await prisma.class.findFirst({
      where: { name, level },
    });

    if (existingClass) {
      return res.status(409).json({
        error: `A class with the name "${name}" at level "${level}" already exists.`,
      });
    }

    // Validate teacher IDs
    if (teacherIds) {
      const teachers = await prisma.teacher.findMany({
        where: {
          id: {
            in: teacherIds,
          },
        },
      });

      if (teachers.length !== teacherIds.length) {
        return res.status(400).json({
          error: "One or more teacher IDs are invalid.",
        });
      }
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        level,
        description: description || "",
        subjects: {
          connect: subjects ? subjects.map((subjectId: number) => ({ id: subjectId })) : [],
        },
        students: {
          connect: studentIds ? studentIds.map((studentId: number) => ({ id: studentId })) : [],
        },
        ClassTeacher: {
          create: teacherIds
            ? teacherIds.map((teacherId: number) => ({
                teacher: { connect: { id: teacherId } },
              }))
            : [],
        },
      },
      include: {
        subjects: true,
        students: true,
        ClassTeacher: {
          include: {
            teacher: true,
          },
        },
      },
    });

    console.log("Class created successfully:", newClass);

    return res.status(201).json(newClass);
  } catch (error) {
    console.error("Failed to create class:", error);
    return res.status(500).json({
      error: "Unable to create class due to an unexpected error.",
      detailedError: error instanceof Error ? error.message : "No additional error information available.",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllClasses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        subjects: true,
        students: true,
        ClassTeacher: {
          include: {
            teacher: true,
          },
        },
      },
    });
    res.json(classes);
  } catch (error) {
    console.error("Failed to retrieve classes:", error);
    res.status(500).json({ error: "Failed to retrieve classes." });
  } finally {
    await prisma.$disconnect();
  }
};

export const getClassById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        subjects: true,
        students: true,
        ClassTeacher: {
          include: {
            teacher: true,
          },
        },
      },
    });
    if (classData) {
      res.json(classData);
    } else {
      res.status(404).json({ error: "Class not found." });
    }
  } catch (error) {
    console.error("Failed to retrieve class:", error);
    res.status(500).json({ error: "Failed to retrieve class." });
  } finally {
    await prisma.$disconnect();
  }
};

export const updateClass = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { subjects, teacherIds, studentIds, ...data } = req.body;

    const updatedClass = await prisma.class.update({
      where: { id },
      data: {
        ...data,
        subjects: {
          set: subjects ? subjects.map((subjectId: number) => ({ id: subjectId })) : [],
        },
        students: {
          set: studentIds ? studentIds.map((studentId: number) => ({ id: studentId })) : [],
        },
        ClassTeacher: {
          deleteMany: {},
          create: teacherIds
            ? teacherIds.map((teacherId: number) => ({
                teacher: { connect: { id: teacherId } },
              }))
            : [],
        },
      },
      include: {
        subjects: true,
        students: true,
        ClassTeacher: {
          include: {
            teacher: true,
          },
        },
      },
    });

    res.json(updatedClass);
  } catch (error) {
    console.error("Failed to update class:", error);
    res.status(500).json({ error: "Failed to update class." });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteClass = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    await prisma.$transaction(async (prisma) => {
      // Disconnect subjects associated with the class
      const disconnectedSubjects = await prisma.subject.updateMany({
        where: { classId: id },
        data: { classId: null },
      });
      console.log(`Disconnected subjects from class ${id}:`, disconnectedSubjects);

      // Disconnect students associated with the class
      const disconnectedStudents = await prisma.student.updateMany({
        where: { classId: id },
        data: { classId: null },
      });
      console.log(`Disconnected students from class ${id}:`, disconnectedStudents);

      // Delete all ClassTeacher associations
      const deletedClassTeachers = await prisma.classTeacher.deleteMany({
        where: { classId: id },
      });
      console.log(`Deleted ClassTeacher associations for class ${id}:`, deletedClassTeachers);

      // Delete related schedules
      const deletedSchedules = await prisma.schedule.deleteMany({
        where: { classId: id },
      });
      console.log(`Deleted schedules for class ${id}:`, deletedSchedules);

      // Delete related attendances
      const deletedAttendances = await prisma.attendance.deleteMany({
        where: { classId: id },
      });
      console.log(`Deleted attendances for class ${id}:`, deletedAttendances);

      // Finally, delete the class
      const deletedClass = await prisma.class.delete({
        where: { id },
      });
      console.log(`Deleted class ${id}:`, deletedClass);
    });

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete class:", error);

    // Check for specific error types or constraints
    if (error.code === "P2003") {
      // Foreign key constraint failure
      res.status(400).json({ error: "Cannot delete class due to foreign key constraints." });
    } else if (error instanceof Error) {
      res.status(500).json({ error: `Failed to delete class: ${error.message}` });
    } else {
      res.status(500).json({ error: "Failed to delete class due to an unknown error." });
    }
  } finally {
    await prisma.$disconnect();
  }
};

export const getClassStudents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);

    const classWithStudents = await prisma.class.findUnique({
      where: { id },
      include: {
        students: true,
      },
    });

    if (!classWithStudents) {
      return res.status(404).json({ error: "Class not found." });
    }

    return res.json(classWithStudents.students);
  } catch (error) {
    console.error("Failed to retrieve students for the class:", error);
    return res.status(500).json({ error: "Failed to retrieve students for the class." });
  } finally {
    await prisma.$disconnect();
  }
};

export const getClassTeachers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);

    const classWithTeachers = await prisma.class.findUnique({
      where: { id },
      include: {
        ClassTeacher: {
          include: {
            teacher: true,
          },
        },
      },
    });

    if (!classWithTeachers) {
      return res.status(404).json({ error: "Class not found." });
    }

    const teachers = classWithTeachers.ClassTeacher.map(ct => ct.teacher);
    return res.json(teachers);
  } catch (error) {
    console.error("Failed to retrieve teachers for the class:", error);
    return res.status(500).json({ error: "Failed to retrieve teachers for the class." });
  } finally {
    await prisma.$disconnect();
  }
};


export const getClassSubjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);

    const classWithSubjects = await prisma.class.findUnique({
      where: { id },
      include: {
        subjects: true,
      },
    });

    if (!classWithSubjects) {
      return res.status(404).json({ error: "Class not found." });
    }

    return res.json(classWithSubjects.subjects);
  } catch (error) {
    console.error("Failed to retrieve subjects for the class:", error);
    return res.status(500).json({ error: "Failed to retrieve subjects for the class." });
  } finally {
    await prisma.$disconnect();
  }
};

export const getClassSemesters = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);

    const semesters = await prisma.semester.findMany({
      where: {
        semesterClasses: {
          some: {
            classId: id,
          },
        },
      },
    });

    if (!semesters.length) {
      return res.status(404).json({ error: "Semesters not found for this class." });
    }

    return res.json(semesters);
  } catch (error) {
    console.error("Failed to retrieve semesters for the class:", error);
    return res.status(500).json({ error: "Failed to retrieve semesters for the class." });
  } finally {
    await prisma.$disconnect();
  }
};
