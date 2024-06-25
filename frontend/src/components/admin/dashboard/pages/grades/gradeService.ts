import axios from "axios";
import { Grade } from "./types";
import { API_BASE_URL } from "../../../../../api/url";

export const getGrades = () => axios.get<Grade[]>(`${API_BASE_URL}/grades`);
export const getGradeById = (id: number) =>
  axios.get<Grade>(`${API_BASE_URL}/grades/${id}`);
export const createGrade = (grade: Omit<Grade, "id">) =>
  axios.post(`${API_BASE_URL}/grades`, grade);
export const updateGrade = (id: number, grade: Omit<Grade, "id">) =>
  axios.put(`${API_BASE_URL}/grades/${id}`, grade);
export const deleteGrade = (id: number) =>
  axios.delete(`${API_BASE_URL}/grades/${id}`);
export const getClasses = () => axios.get<Class[]>(`${API_BASE_URL}/classes`);
