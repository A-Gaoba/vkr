import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../../../../api/url';

interface Student {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
}

const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>
      <div className="mb-4">
        <strong>Name:</strong> {student.firstName} {student.middleName} {student.lastName}
      </div>
      <div className="mb-4">
        <strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}
      </div>
      <div className="mb-4">
        <strong>Gender:</strong> {student.gender}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {student.email}
      </div>
      <div className="mb-4">
        <strong>Phone Number:</strong> {student.phoneNumber}
      </div>
      <div className="mb-4">
        <strong>Address:</strong> {student.address}
      </div>
      <div className="mb-4">
        <strong>City:</strong> {student.city}
      </div>
      <Link to="/admin/students" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Back to List</Link>
    </div>
  );
};

export default StudentDetails;
