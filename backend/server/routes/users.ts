import { Router, Request, Response } from "express";
const router = Router();

import z from "zod";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

import authenticateToken from "../middlewares/auth";
import sendVerificationEmail from "../utils/sendVerificationEmail";

const userRegistrationSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
  role: z.string(),
});

type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

router.post("/users", async (req: Request, res: Response) => {
  try {
    // Validating user input
    console.log(req.body);
    const user = userRegistrationSchema.parse(req.body);

    // Storing user input in db
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const createdUser = await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: hashedPassword,
        role: user.role as UserRole,
      },
    });

    try {
      const { id, email } = createdUser;
      await sendVerificationEmail(id, email);
      res.json({
        success: true,
        message: `verification message was sent to email: ${email}`,
      });
    } catch (err) {
      console.error("Error sending email:", err);
      res.status(500).json({
        success: false,
        error: "Failed to send verification email.",
      });
    }
  } catch (error: any) {
    console.error("User registration error:", error);
    res.json({ success: false, error });
  }
});

router.patch(
  "/admin/change-role/:userId",
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      // Validate the input

      // Update the user's role in the database
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(userId, 10),
        },
        data: {
          role: role,
        },
      });

      res.json({
        success: true,
        data: updatedUser,
      });
    } catch (error: any) {
      console.error("Error changing user role:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
  }
);

router.get("/verify-email", async (req: Request, res: Response) => {
  try {
    const verificationToken = req.query.token;
    const user = jwt.verify(
      verificationToken as string,
      process.env.SECRET as string
    ) as {
      id: number;
      iat: number;
      exp: number;
    };

    const verifiedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });
    res.render("emailVerified", {
      name: verifiedUser.username,
      email: verifiedUser.email,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    // Validating user input
    const { email, password } = req.body;

    const userLoginSchema = z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(3, "Password must contain at least 3 characters"),
    });

    const userInput = userLoginSchema.parse({
      email,
      password,
    });

    // Check if the user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userInput.email,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: "User not found. Please register first.",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(
      userInput.password,
      existingUser.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
      role: existingUser.role,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
});

router.get(
  "/admin-data",
  authenticateToken("ADMIN"),
  (req: Request, res: Response) => {
    res.json({ success: true, message: "admin data" });
  }
);

router.get(
  "/moderator-data",
  authenticateToken("MODERATOR"),
  (req: Request, res: Response) => {
    res.json({ success: true, message: "moderator data" });
  }
);

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});

    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.json({ success: false, error });
  }
});

router.delete("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.deleteMany({});

    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.json({ success: false, error });
  }
});

export default router;
