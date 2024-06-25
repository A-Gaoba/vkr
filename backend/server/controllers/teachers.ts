import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { teachers } from "../routes/teachers";

const prisma = new PrismaClient();

// export const createTeacher = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const {
//     firstName,
//     middleName,
//     lastName,
//     gender = "OTHER",
//     dateOfBirth,
//     email,
//     phone,
//     bio,
//     yearsOfExperience,
//     password,
//     subjectsTaught,
//   } = req.body;

//   console.log("Incoming request body:", req.body);

//   if (!firstName || !lastName || !email || !password) {
//     return res.status(400).json({
//       error:
//         "Missing required fields: firstName, lastName, email, password, or gender.",
//     });
//   }

//   try {
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ error: "A user with this email already exists." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const teacher = await prisma.teacher.create({
//       data: {
//         firstName,
//         middleName: middleName || "",
//         lastName,
//         gender,
//         dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
//         email,
//         phone: phone || null,
//         bio: bio || null,
//         yearsOfExperience: parseInt(yearsOfExperience, 10) || 0,
//         user: {
//           create: {
//             username: email,
//             email,
//             password: hashedPassword,
//             role: "TEACHER",
//             verified: false,
//           },
//         },
//         subjects: {
//           connect: subjectsTaught
//             ? subjectsTaught.map((subjectId: number) => ({ id: subjectId }))
//             : [],
//         },
//       },
//       include: {
//         user: true,
//         subjects: true,
//       },
//     });

//     console.log("Teacher created successfully:", teacher);

//     return res.status(201).json(teacher);
//   } catch (error) {
//     console.error("Failed to create teacher:", error);
//     if (error instanceof Error) {
//       console.error("Error details:", error.message);
//     }
//     return res.status(500).json({
//       error: "Unable to create teacher due to an unexpected error.",
//       detailedError:
//         error instanceof Error
//           ? error.message
//           : "No additional error information available.",
//     });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

export const createTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    firstName,
    middleName,
    lastName,
    gender = "OTHER",
    dateOfBirth,
    email,
    phone,
    bio,
    yearsOfExperience,
    password,
    subjectsTaught,
    classId, // Ensure this field is included
  } = req.body;

  console.log("Incoming request body:", req.body);

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      error: "Missing required fields: firstName, lastName, email, password.",
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

    const teacher = await prisma.teacher.create({
      data: {
        firstName,
        middleName: middleName || "",
        lastName,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        email,
        phone: phone || null,
        bio: bio || null,
        yearsOfExperience: parseInt(yearsOfExperience, 10) || 0,
        user: {
          create: {
            username: email,
            email,
            password: hashedPassword,
            role: "TEACHER",
            verified: false,
          },
        },
        subjects: {
          connect: subjectsTaught
            ? subjectsTaught.map((subjectId: number) => ({ id: subjectId }))
            : [],
        },
        classes: classId
          ? {
              create: [
                {
                  class: {
                    connect: { id: parseInt(classId, 10) }, // Ensure classId is an integer
                  },
                },
              ],
            }
          : undefined,
      },
      include: {
        user: true,
        subjects: true,
        classes: true,
      },
    });

    console.log("Teacher created successfully:", teacher);

    return res.status(201).json(teacher);
  } catch (error) {
    console.error("Failed to create teacher:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return res.status(500).json({
      error: "Unable to create teacher due to an unexpected error.",
      detailedError:
        error instanceof Error
          ? error.message
          : "No additional error information available.",
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllTeachers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: true,
        subjects: true,
        classes: true,
      },
    });
    res.json(teachers);
  } catch (error) {
    console.error("Failed to retrieve teachers:", error);
    res.status(500).json({ error: "Failed to retrieve teachers." });
  }
};

export const getTeacherById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        user: true,
        subjects: true,
        classes: true,
      },
    });
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ error: "Teacher not found." });
    }
  } catch (error) {
    console.error("Failed to retrieve teacher:", error);
    res.status(500).json({ error: "Failed to retrieve teacher." });
  }
};

export const updateTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { email, password, ...data } = req.body;

    if (email) {
      res
        .status(400)
        .json({ error: "Changing email is not allowed via this method." });
      return;
    }

    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: {
        ...data,
        user: {
          update: {
            password: password ? await bcrypt.hash(password, 10) : undefined,
          },
        },
      },
      include: {
        user: true,
      },
    });

    res.json(updatedTeacher);
  } catch (error) {
    console.error("Failed to update teacher:", error);
    res.status(500).json({ error: "Failed to update teacher." });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);

  try {
    await prisma.$transaction(async (prisma) => {
      // Delete ClassTeacher relations
      await prisma.classTeacher.deleteMany({
        where: { teacherId: id },
      });

      // Update related subjects to remove the teacher
      await prisma.subject.updateMany({
        where: { teacherId: id },
        data: { teacherId: null },
      });

      // Delete the teacher and capture the userId
      const teacher = await prisma.teacher.delete({
        where: { id },
        select: { userId: true },
      });

      // Delete the user associated with the teacher
      await prisma.user.delete({
        where: { id: teacher.userId },
      });
    });

    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete teacher:", error);
    res
      .status(500)
      .json({ error: "Failed to delete teacher.", details: error.message });
  }
};
