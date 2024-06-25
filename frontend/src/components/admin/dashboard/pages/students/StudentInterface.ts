export interface AttendanceInfo {
  date: string;
  status: string;
}

export interface Grade {
  id: number;
  value: number;
  subject: {
    name: string;
  };
  semester: {
    term: number;
    year: number;
  };
}

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Subject {
  id: number;
  name: string;
  description?: string;
  teacher?: Teacher;
  teacherId: number;
  grades?: Grade[];
  semester: string
}

export interface StudentPageProps {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  image: string;
  classId?: number;
  attendanceInfo?: {
    totalClassesAttended: number;
    attendancePercentage: number;
  };
  grades?: Grade[];
}

export interface Class {
  id: number;
  name: string;
  level: number;
  subjects: Subject[];
}

export interface ClassDetails {
  id: number;
  name: string;
  level: number;
  subjects: Subject[];
}

export interface Student {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  classId?: number;
  level?: number;
  attendanceInfo?: {
    totalClassesAttended: number;
    attendancePercentage: number;
  };
  grades?: Grade[];
}
