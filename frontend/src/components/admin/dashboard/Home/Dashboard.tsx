import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../../Loading';
import 'react-calendar/dist/Calendar.css';
import 'chart.js/auto';
import InfoCard from './InfoCard';
import Table from './Table';
import Pagination from './Pagination';
import StudentsByClassChart from './StudentsByClassChart';
import CalendarComponent from './CalendarComponent';
import ClassFilter from './ClassFilter';
import { API_BASE_URL } from '../../../../api/url';

interface Subject {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  classId: string | null;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState({
    studentsCount: 0,
    teachersCount: 0,
    classesCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsByClass, setStudentsByClass] = useState<{ [key: string]: number }>({});
  const [show, setShow] = useState<'students' | 'teachers'>('students');
  const [selectedClass, setSelectedClass] = useState<string>('All');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, teachersData, classesData] = await Promise.all([
          fetch(`${API_BASE_URL}/students`).then(res => res.json()),
          fetch(`${API_BASE_URL}/teachers`).then(res => res.json()),
          fetch(`${API_BASE_URL}/classes`).then(res => res.json()),
        ]);

        const classCounts: { [key: string]: number } = {};
        studentsData.forEach((student: Student) => {
          const classId = student.classId ? String(student.classId) : 'Not Enrolled';
          classCounts[classId] = (classCounts[classId] || 0) + 1;
        });

        setData({
          studentsCount: studentsData.length,
          teachersCount: teachersData.length,
          classesCount: classesData.length,
        });

        console.log('Fetched Teachers Data:', teachersData); // Debugging line to inspect the teachers data

        setTeachers(teachersData);
        setStudents(studentsData.map((student: Student) => ({
          ...student,
          classId: student.classId ? String(student.classId) : null,
        })));
        setStudentsByClass(classCounts);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (direction: 'next' | 'prev') => {
    setCurrentPage(prev => direction === 'next' ? prev + 1 : prev - 1);
  };

  const handleDelete = (id: number) => {
    if (show === 'students') {
      setStudents(prev => prev.filter(student => student.id !== id));
      setData(prev => ({ ...prev, studentsCount: prev.studentsCount - 1 }));
    } else {
      setTeachers(prev => prev.filter(teacher => teacher.id !== id));
      setData(prev => ({ ...prev, teachersCount: prev.teachersCount - 1 }));
    }
  };

  const handleClassChange = (classId: string) => {
    setSelectedClass(classId);
    setCurrentPage(1);  // Reset to the first page on class change
  };

  const filteredStudents = selectedClass === 'All'
    ? students
    : students.filter(student => student.classId === selectedClass);

  const currentData = show === 'students' ? filteredStudents : teachers;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = currentData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(currentData.length / itemsPerPage);

  const studentsByClassData = {
    labels: Object.keys(studentsByClass),
    datasets: [{
      label: 'Students',
      data: Object.values(studentsByClass),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverOffset: 4
    }]
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-left text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-6 mb-8">
          <InfoCard label="Students" count={data.studentsCount} link="/admin/students" />
          <InfoCard label="Teachers" count={data.teachersCount} link="/admin/teachers" />
          <InfoCard label="Classes" count={data.classesCount} link="/admin/classes" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-700">{show === 'students' ? 'Students' : 'Teachers'}</h2>
            <button onClick={() => setShow(show === 'students' ? 'teachers' : 'students')} className="px-4 py-2 bg-dark-purple text-white rounded hover:bg-blue-600 transition duration-300">
              Show {show === 'students' ? 'Teachers' : 'Students'}
            </button>
          </div>
          {show === 'students' && (
            <ClassFilter
              classes={Object.keys(studentsByClass)}
              selectedClass={selectedClass}
              onClassChange={handleClassChange}
            />
          )}
          <Table data={paginatedData} show={show} startIndex={startIndex} onDelete={handleDelete} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
          <StudentsByClassChart data={studentsByClassData} />
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
