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
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const generateVerificationLink = (userId) => {
    const verificationToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.SECRET, {
        expiresIn: "1d",
    });
    return `http://localhost:3001/verify-email?token=${verificationToken}`;
};
function sendVerificationEmail(id, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: "Verify Your Email Address",
            text: `Please click on the following link to verify your email address: ${generateVerificationLink(id)}`,
        };
        yield transporter.sendMail(message);
    });
}
exports.default = sendVerificationEmail;
