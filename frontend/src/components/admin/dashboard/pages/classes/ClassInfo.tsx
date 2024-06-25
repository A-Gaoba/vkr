import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../../../../Loading';
import { API_BASE_URL } from '../../../../../api/url';

interface Subject {
  id: number;
  name: string;
  description?: string;
  teacher?: Teacher;
  teacherId?: number;
}

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface ClassDetailData {
  id: number;
  name: string;
  level: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  subjects: Subject[];
  students: Student[];
}

const ClassDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [classDetail, setClassDetail] = useState<ClassDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAllSubjects, setShowAllSubjects] = useState<boolean>(false);
  const [showAllStudents, setShowAllStudents] = useState<boolean>(false);

  useEffect(() => {
    const fetchClassDetails = async () => {
      setLoading(true);
      try {
        const classResponse = await fetch(`${API_BASE_URL}/classes/${id}`);
        const classData = await classResponse.json();

        classData.subjects = classData.subjects || [];
        classData.students = classData.students || [];

        const subjectsWithTeachers = await Promise.all(
          classData.subjects.map(async (subject: Subject) => {
            const teacherId = subject.teacher?.id || subject.teacherId;
            if (teacherId) {
              const teacherResponse = await fetch(`${API_BASE_URL}/teachers/${teacherId}`);
              const teacherData = await teacherResponse.json();
              return { ...subject, teacher: teacherData };
            }
            return subject;
          })
        );

        classData.subjects = subjectsWithTeachers;
        classData.subjects.sort((a: Subject, b: Subject) => a.name.localeCompare(b.name));

        setClassDetail(classData);
      } catch (error) {
        console.error('Error fetching class details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!classDetail) {
    return <div className="flex justify-center items-center h-screen">No class data found.</div>;
  }

  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Class Details: {classDetail.name} (Level {classDetail.level})
      </h1>
      <p className="text-md text-gray-600">{classDetail.description}</p>
      <div className="mt-4">
        <span className="text-sm font-semibold">Created:</span> {formatDate(classDetail.createdAt)} |
        <span className="text-sm font-semibold">Last Updated:</span> {formatDate(classDetail.updatedAt)}
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-blue-700">Subjects</h2>
        {classDetail.subjects.length ? (
          <>
            <table className="min-w-full table-auto text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Subject Name</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Teacher</th>
                </tr>
              </thead>
              <tbody>
                {(showAllSubjects ? classDetail.subjects : classDetail.subjects.slice(0, 5)).map(subject => (
                  <tr key={subject.id} className="bg-white border-b">
                    <td className="px-6 py-4">{subject.name}</td>
                    <td className="px-6 py-4">{subject.description}</td>
                    <td className="px-6 py-4">
                      {subject.teacher ? (
                        <Link to={`/admin/teachers/${subject.teacher.id}`} className="text-blue-500 hover:text-blue-600">
                          {subject.teacher.firstName} {subject.teacher.lastName}
                        </Link>
                      ) : (
                        <p className="text-slate-300">No teacher assigned</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {classDetail.subjects.length > 5 && (
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowAllSubjects(!showAllSubjects)}
              >
                {showAllSubjects ? 'Show Less' : 'Show All'}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500">No subjects listed for this class.</p>
        )}
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-semibold text-red-700">Students</h2>
        {classDetail.students.length ? (
          <>
            <table className="min-w-full table-auto text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {(showAllStudents ? classDetail.students : classDetail.students.slice(0, 5)).map(student => (
                  <tr key={student.id} className="bg-white border-b">
                    <td className="px-6 py-4">
                      <Link to={`/admin/students/${student.id}`} className="text-blue-500 hover:text-blue-600">
                        {student.firstName} {student.lastName}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {classDetail.students.length > 5 && (
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowAllStudents(!showAllStudents)}
              >
                {showAllStudents ? 'Show Less' : 'Show All'}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500">No students enrolled in this class.</p>
        )}
      </section>
    </div>
  );
};

export default ClassDetail;
