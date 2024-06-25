export interface TeacherData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth?: string;
  phone?: string;
  yearsOfExperience: number;
  bio?: string;
  image?: string;
  classId?: number;
  subjectsTaught: number[];
}

export interface Subject {
  id: number;
  name: string;
  description?: string;
}

export interface TeacherProfileProps {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  image?: string;
  gender?: string;
  dateOfBirth?: string;
  email: string;
  phone?: string;
  yearsOfExperience?: number;
  subjectsTaught: Subject[];
  bio?: string;
}

export interface PersonalInfoProps {
  label: string;
  value?: string | number;
}

export interface AcademicInfoProps {
  label: string;
  value?: string | number;
}

export interface TeacherScheduleProps {
  day: string;
  date: string;
  time: string;
}
