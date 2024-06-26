"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const sendVerificationEmail_1 = __importDefault(require("../utils/sendVerificationEmail"));
const userRegistrationSchema = zod_1.default.object({
    username: zod_1.default.string().min(3),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(3),
    role: zod_1.default.string(),
});
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validating user input
        console.log(req.body);
        const user = userRegistrationSchema.parse(req.body);
        // Storing user input in db
        const salt = yield bcrypt_1.default.genSalt(SALT_ROUNDS);
        const hashedPassword = yield bcrypt_1.default.hash(user.password, salt);
        const createdUser = yield prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: hashedPassword,
                role: user.role,
            },
        });
        try {
            const { id, email } = createdUser;
            yield (0, sendVerificationEmail_1.default)(id, email);
            res.json({
                success: true,
                message: `verification message was sent to email: ${email}`,
            });
        }
        catch (err) {
            console.error("Error sending email:", err);
            res.status(500).json({
                success: false,
                error: "Failed to send verification email.",
            });
        }
    }
    catch (error) {
        console.error("User registration error:", error);
        res.json({ success: false, error });
    }
}));
router.patch("/admin/change-role/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { role } = req.body;
        // Validate the input
        // Update the user's role in the database
        const updatedUser = yield prisma.user.update({
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
    }
    catch (error) {
        console.error("Error changing user role:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error.",
        });
    }
}));
router.get("/verify-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verificationToken = req.query.token;
        const user = jsonwebtoken_1.default.verify(verificationToken, process.env.SECRET);
        const verifiedUser = yield prisma.user.update({
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
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            error,
        });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validating user input
        const { email, password } = req.body;
        const userLoginSchema = zod_1.default.object({
            email: zod_1.default.string().email(),
            password: zod_1.default
                .string()
                .min(3, "Password must contain at least 3 characters"),
        });
        const userInput = userLoginSchema.parse({
            email,
            password,
        });
        // Check if the user exists in the database
        const existingUser = yield prisma.user.findUnique({
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
        const passwordMatch = yield bcrypt_1.default.compare(userInput.password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                error: "Invalid password.",
            });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: existingUser.id }, process.env.SECRET, {
            expiresIn: "1d",
        });
        res.json({
            success: true,
            token,
            role: existingUser.role,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error.",
        });
    }
}));
router.get("/admin-data", (0, auth_1.default)("ADMIN"), (req, res) => {
    res.json({ success: true, message: "admin data" });
});
router.get("/moderator-data", (0, auth_1.default)("MODERATOR"), (req, res) => {
    res.json({ success: true, message: "moderator data" });
});
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({});
        res.json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        res.json({ success: false, error });
    }
}));
router.delete("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.deleteMany({});
        res.json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        res.json({ success: false, error });
    }
}));
exports.default = router;
