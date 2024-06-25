import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../../Loading';
import { API_BASE_URL } from '../../../../../api/url';

interface Subject {
  id: number;
  name: string;
  class: number;
  semester: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Teacher {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth?: string;
  gender: string;
  email: string;
  phone?: string;
  image?: string;
  bio?: string;
  yearsOfExperience: number;
  subjects: Subject[];
}

const extractClassAndSemester = (name: string) => {
  const classMatch = name.match(/Class (\d+)/);
  const semesterMatch = name.match(/Semester (\d+)/);
  return {
    class: classMatch ? parseInt(classMatch[1], 10) : undefined,
    semester: semesterMatch ? parseInt(semesterMatch[1], 10) : undefined,
  };
};

const formatSubjectName = (subject: Subject) => {
  const { class: classNumber, semester } = subject;
  const name = subject.name.substring(0, 5);
  return `${name}${classNumber}-${semester}`;
};

const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => (
  <div className="border p-4 flex flex-col justify-center items-center shadow-slate-900 shadow-sm">
    <img
      src="../../../../../../public/person-svgrepo-com.svg"
      alt={`${teacher.firstName} ${teacher.lastName}`}
      className="mb-2 w-32 h-32 object-cover rounded-full"
    />
    <p className="text-lg font-semibold">{`${teacher.firstName} ${teacher.middleName || ''} ${teacher.lastName}`}</p>
    <p className="text-gray-600">{teacher.subjects.map(subject => formatSubjectName(subject)).join(', ') || 'Not specified'}</p>
    <p className="text-gray-600">{`ID: ${teacher.id}`}</p>
    <Link to={`/admin/teachers/${teacher.id}`}>
      <button className="mt-2 bg-dark-purple text-white px-4 py-2 rounded hover:bg-blue-600">View</button>
    </Link>
  </div>
);

const HomeTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/teachers`);
        const teachersData = response.data.map((teacher: Teacher) => ({
          ...teacher,
          subjects: teacher.subjects.map(subject => ({
            ...subject,
            ...extractClassAndSemester(subject.name),
          })),
        }));
        setTeachers(teachersData);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.subjects.some(subject => {
      const matchesClass = selectedClass ? subject.class === selectedClass : true;
      const matchesSubject = selectedSubject ? formatSubjectName(subject) === selectedSubject : true;
      return matchesClass && matchesSubject;
    })
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTeachers = filteredTeachers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  const handleClassFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = event.target.value ? parseInt(event.target.value, 10) : null;
    setSelectedClass(selectedClass);
    setSelectedSubject(null); // Reset subject filter when class is changed
    setCurrentPage(1);
  };

  const handleSubjectFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubject = event.target.value || null;
    setSelectedSubject(selectedSubject);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error: {error}</p>
      </div>
    );
  }

  const classes = [...new Set(teachers.flatMap(teacher => teacher.subjects.map(subject => subject.class)))];
  const subjectsInSelectedClass = selectedClass
    ? [...new Set(teachers.flatMap(teacher => teacher.subjects.filter(subject => subject.class === selectedClass).map(subject => formatSubjectName(subject))))]
    : [];

  return (
    <div>
      <div className="flex justify-end text-white p-4">
        <Link to="/admin/teachers/add">
          <button type="button" className="bg-dark-purple p-2 text-white flex items-center mb-4">Add Teacher</button>
        </Link>
      </div>
      <nav className="bg-white p-4">
        <div className="flex items-center">
          <span className="text-black text-lg font-semibold">Class:</span>
          <select
            title='class name'
            className="ml-4 p-2 border rounded"
            value={selectedClass || ''}
            onChange={handleClassFilterChange}

          >
            <option value="">All</option>
            {classes.map(classNumber => (
              <option key={classNumber} value={classNumber}>
                Class {classNumber}
              </option>
            ))}
          </select>
        </div>
        {selectedClass && (
          <div className="flex items-center mt-4">
            <span className="text-black text-lg font-semibold">Subject:</span>
            <select
            title='subject'
              className="ml-4 p-2 border rounded"
              value={selectedSubject || ''}
              onChange={handleSubjectFilterChange}
            >
              <option value="">All</option>
              {subjectsInSelectedClass.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        )}
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-8">
        {paginatedTeachers.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-white"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-2 ${currentPage === index + 1 ? 'bg-dark-purple text-white' : 'bg-white'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomeTeachers;
