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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authenticateToken = (requiredRole) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            error: "Access denied. Token not provided.",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        const user = yield prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found.",
            });
        }
        if (!user.verified) {
            return res.status(403).json({
                success: false,
                error: "User email not verified. Please verify your email.",
            });
        }
        if (user.role !== requiredRole) {
            return res.status(403).json({
                success: false,
                error: "Access denied. Insufficient privileges.",
            });
        }
        req.user = user; // Attach the user to the request for later use in the route handler
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({
            success: false,
            error: "Invalid token.",
        });
    }
});
exports.authenticateToken = authenticateToken;
exports.default = exports.authenticateToken;
