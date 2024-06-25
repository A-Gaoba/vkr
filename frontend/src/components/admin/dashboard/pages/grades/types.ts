export interface Student {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Class {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  name: string;
  class: Class;
}

export interface Semester {
  id: number;
  term: number;
  year: number;
}

export interface Grade {
  id: number;
  value: number;
  student: Student;
  subject: Subject;
  semester: Semester;
}
