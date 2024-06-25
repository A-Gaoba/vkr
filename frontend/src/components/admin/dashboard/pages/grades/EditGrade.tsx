import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const EditGrade: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [value, setValue] = useState<number>(0);
  const [studentId, setStudentId] = useState<number>(0);
  const [subjectId, setSubjectId] = useState<number>(0);
  const [semesterId, setSemesterId] = useState<number>(0);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, subjectRes, semesterRes, gradeRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/students`),
          axios.get(`${API_BASE_URL}/subjects`),
          axios.get(`${API_BASE_URL}/semesters`),
          axios.get(`${API_BASE_URL}/grades/${id}`),
        ]);

        setStudents(studentRes.data);
        setSubjects(subjectRes.data);
        setSemesters(semesterRes.data);

        const grade = gradeRes.data;
        setValue(grade.value);
        setStudentId(grade.student.id);
        setSubjectId(grade.subject.id);
        setSemesterId(grade.semester.id);

        console.log('Grade Response:', gradeRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id) {
      console.error('Error: id is undefined');
      return;
    }

    const updatedGrade = {
      value,
      studentId,
      subjectId,
      semesterId,
    };

    try {
      await axios.put(`${API_BASE_URL}/grades/${id}`, updatedGrade);
      toast.success('Grade updated successfully!');
      navigate('');
    } catch (error) {
      console.error('Error updating grade:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Edit Grade</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
          <input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value, 10))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="student" className="block text-sm font-medium text-gray-700">Student</label>
          <select
            id="student"
            value={studentId}
            onChange={(e) => setStudentId(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
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
            value={subjectId}
            onChange={(e) => setSubjectId(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
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
            value={semesterId}
            onChange={(e) => setSemesterId(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          >
            <option value="">Select a semester</option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {`Term ${semester.term}, Year ${semester.year}`}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Update</button>
      </form>
    </div>
  );
};

export default EditGrade;
