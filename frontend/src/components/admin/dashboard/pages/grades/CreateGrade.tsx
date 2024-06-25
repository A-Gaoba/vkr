import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../../../../api/url';

interface Student {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

interface Subject {
  id: number;
  name: string;
}

interface Semester {
  id: number;
  term: number;
  year: number;
}

interface Class {
  id: number;
  name: string;
}

const CreateGrade: React.FC = () => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [studentId, setStudentId] = useState<number | undefined>(undefined);
  const [subjectId, setSubjectId] = useState<number | undefined>(undefined);
  const [semesterId, setSemesterId] = useState<number | undefined>(undefined);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classRes = await axios.get(`${API_BASE_URL}/classes`);
        setClasses(classRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedClassId !== undefined) {
      const fetchClassData = async () => {
        try {
          const [studentsRes, subjectsRes, semestersRes] = await Promise.all([
            axios.get(`${API_BASE_URL}/classes/${selectedClassId}/students`),
            axios.get(`${API_BASE_URL}/classes/${selectedClassId}/subjects`),
            axios.get(`${API_BASE_URL}/classes/${selectedClassId}/semesters`),
          ]);

          setStudents(studentsRes.data);
          setSubjects(subjectsRes.data);
          setSemesters(semestersRes.data);
        } catch (error) {
          console.error('Failed to fetch class-related data:', error);
        }
      };

      fetchClassData();
    }
  }, [selectedClassId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (value === undefined || studentId === undefined || subjectId === undefined || semesterId === undefined) {
      alert('All fields are required.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/grades`, {
        value,
        studentId,
        subjectId,
        semesterId,
      });

      toast.success('Grade created successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Failed to create grade:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Create Grade</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
          <input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
          <select
            id="class"
            value={selectedClassId || ''}
            onChange={(e) => setSelectedClassId(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          >
            <option value="">Select a class</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="student" className="block text-sm font-medium text-gray-700">Student</label>
          <select
            id="student"
            value={studentId || ''}
            onChange={(e) => setStudentId(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            disabled={!selectedClassId}
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {`${student.firstName} ${student.middleName} ${student.lastName}`.trim()}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <select
            id="subject"
            value={subjectId || ''}
            onChange={(e) => setSubjectId(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            disabled={!selectedClassId}
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
          <select
            id="semester"
            value={semesterId || ''}
            onChange={(e) => setSemesterId(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
            disabled={!selectedClassId}
          >
            <option value="">Select a semester</option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {`Term ${semester.term}, Year ${semester.year}`}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Grade
        </button>
      </form>
    </div>
  );
};

export default CreateGrade;
