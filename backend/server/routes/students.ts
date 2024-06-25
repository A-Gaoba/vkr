import { Router } from 'express';
import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from '../controllers/students';

export const students = Router();

students.post('/', createStudent);
students.get('/', getAllStudents);
students.get('/:id', getStudentById);
students.put('/:id', updateStudent);
students.delete('/:id', deleteStudent);
