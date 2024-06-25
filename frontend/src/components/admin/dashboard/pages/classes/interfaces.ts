export interface ClassData {
  id?: number;
  name: string;
  level: number;
  description: string;
  subjects?: Subject[];
  subjectIds?: number[];
  students?: Student[];
  schedules?: Schedule[];
  attendances?: Attendance[];
  semesterClasses?: SemesterClass[];
  ClassTeacher?: ClassTeacher[];
}

export interface Subject {
  id: number;
  name: string;
  description?: string;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  image?: string;
}

export interface Schedule {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Attendance {
  id: number;
  date: string;
  status: string;
  studentId: number;
  classId: number;
}

export interface SemesterClass {
  semesterId: number;
  classId: number;
}

export interface ClassTeacher {
  classId: number;
  teacherId: number;
}
