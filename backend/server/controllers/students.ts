import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    firstName,
    middleName,
    lastName,
    gender = "OTHER", // Default to "OTHER" if gender is not provided
    dateOfBirth,
    email,
    phoneNumber,
    address,
    city,
    image,
    password,
    classId,
  } = req.body;

  console.log("Incoming request body:", req.body);

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      error:
        "Missing required fields: firstName, lastName, email, or password.",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "A user with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.student.create({
      data: {
        firstName,
        middleName: middleName || "",
        lastName,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        email,
        phoneNumber,
        address,
        city,
        image: image || null,
        user: {
          create: {
            username: email,
            email,
            password: hashedPassword,
            role: "STUDENT",
            verified: false,
          },
        },
        class: classId ? { connect: { id: classId } } : undefined,
      },
      include: {
        user: true,
        class: true,
      },
    });

    console.log("Student created successfully:", student);

    return res.status(201).json(student);
  } catch (error) {
    console.error("Failed to create student:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return res.status(500).json({
      error: "Unable to create student due to an unexpected error.",
      detailedError:
        error instanceof Error
          ? error.message
          : "No additional error information available.",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: true,
        class: true,
      },
    });
    res.json(students);
  } catch (error) {
    console.error("Failed to retrieve students:", error);
    res.status(500).json({ error: "Failed to retrieve students." });
  }
};

export const getStudentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        class: true,
      },
    });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found." });
    }
  } catch (error) {
    console.error("Failed to retrieve student:", error);
    res.status(500).json({ error: "Failed to retrieve student." });
  }
};

export const updateStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { email, password, classId, ...data } = req.body;

    if (email) {
      res
        .status(400)
        .json({ error: "Changing email is not allowed via this method." });
      return;
    }

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        ...data,
        class: classId ? { connect: { id: classId } } : undefined,
        user: {
          update: {
            password: password ? await bcrypt.hash(password, 10) : undefined,
          },
        },
      },
      include: {
        user: true,
        class: true,
      },
    });

    res.json(updatedStudent);
  } catch (error) {
    console.error("Failed to update student:", error);
    res.status(500).json({ error: "Failed to update student." });
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    await prisma.$transaction(async (prisma) => {
      // Delete related enrollments
      await prisma.enrollment.deleteMany({
        where: { studentId: id },
      });

      // Delete related attendances
      await prisma.attendance.deleteMany({
        where: { studentId: id },
      });

      // Delete related grades
      await prisma.grade.deleteMany({
        where: { studentId: id },
      });

      // Delete the student and capture the userId
      const student = await prisma.student.delete({
        where: { id },
        select: { userId: true },
      });

      // Delete the user associated with the student
      await prisma.user.delete({
        where: { id: student.userId },
      });
    });

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete student:", error);
    res
      .status(500)
      .json({ error: "Failed to delete student.", details: error.message });
  }
};
