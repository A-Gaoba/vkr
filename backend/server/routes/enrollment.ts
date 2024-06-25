import { Router } from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} from "../controllers/enrollment";

const router = Router();

// Routes for enrollments
router.post("/", createEnrollment);
router.get("/", getAllEnrollments);
router.get("/:id", getEnrollmentById);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);

export default router;
