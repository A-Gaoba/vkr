import React, { startTransition, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../../../../api/url';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    startTransition(() => {
      const fetchStudents = async () => {
        try {
          setIsPending(true);
          const response = await axios.get(`${API_BASE_URL}/students`);
          setStudents(response.data);
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setIsPending(false);
        }
      };

      fetchStudents();
    });
  }, []);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.id}</td>
              <td className="border px-4 py-2">{student.firstName} {student.lastName}</td>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">
                <Link to={`/admin/students/${student.id}`} className="text-blue-500">Details</Link>
                <Link to={`/admin/students/edit/${student.id}`} className="ml-2 text-blue-500">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/students/create" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Add Student</Link>
    </div>
  );
};

export default StudentList;
