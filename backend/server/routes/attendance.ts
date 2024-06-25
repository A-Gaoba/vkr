import { Router } from 'express';
import {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from '../controllers/attendance';

const router = Router();

// Routes for attendance
router.post('/', createAttendance);
router.get('/', getAllAttendances);
router.get('/:id', getAttendanceById);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;
