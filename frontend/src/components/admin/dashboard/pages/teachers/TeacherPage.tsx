import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../../../Loading';
import { API_BASE_URL } from '../../../../../api/url';

// Define interfaces
interface Subject {
  id: number;
  name: string;
  description?: string;
}

interface TeacherProfileProps {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender: string;
  email: string;
  phone?: string;
  image?: string;
  bio?: string;
  yearsOfExperience: number;
  subjectsTaught: Subject[];
}

// Define PersonalInfo component
const PersonalInfo: React.FC<{ label: string; value?: string | number }> = ({ label, value }) => (
  <p className="mb-2 text-sm md:text-base capitalize">
    <span className="text-gray-700 font-bold">{label}:</span> {value ?? 'N/A'}
  </p>
);

// Define AcademicInfo component
const AcademicInfo: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <p className="mb-2 md:text-base text-sm">
    <span className="font-bold">{label}:</span> {value ?? 'N/A'}
  </p>
);

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const TeacherProfile: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [teacher, setTeacher] = useState<TeacherProfileProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`${API_BASE_URL}/teachers/${id}`)
        .then(response => {
          const teacherData = response.data;
          console.log('Fetched Teacher Data:', teacherData); // Debug log to check fetched data

          // Ensure subjectsTaught is correctly mapped
          teacherData.subjectsTaught = teacherData.subjectsTaught || teacherData.subjects || [];

          setTeacher(teacherData);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to fetch teacher');
          setLoading(false);
        });
    } else {
      setError('Invalid teacher ID');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!teacher) return <div className="text-red-500">Teacher not found</div>;

  return (
    <div className="md:p-6 bg-gray-100">
      <main className="mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{`${teacher.firstName} ${teacher.lastName}'s Profile`}</h1>

        <section className="mb-8 bg-gray-50 p-6 rounded-md shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex justify-center md:justify-start">
              <img
                src="../../../../../../../public/person-svgrepo-com.svg"
                alt={`${teacher.firstName} ${teacher.lastName}`}
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PersonalInfo label="Full Name" value={`${teacher.firstName} ${teacher.lastName}`} />
                <PersonalInfo label="Date of Birth" value={formatDate(teacher.dateOfBirth)} />
                <PersonalInfo label="Email" value={teacher.email} />
                <PersonalInfo label="Phone Number" value={teacher.phone} />
                <PersonalInfo label="Gender" value={teacher.gender} />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 bg-gray-50 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AcademicInfo 
              label="Subjects Taught" 
              value={teacher.subjectsTaught.map((subject: Subject) => (
                <span key={subject.id} className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full mr-2 mb-2">
                  {subject.name}
                </span>
              ))} 
            />
            <AcademicInfo 
              label="Years of Experience" 
              value={
                <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {teacher.yearsOfExperience}
                </span>
              } 
            />
          </div>
        </section>

        <section className="mb-8 bg-gray-50 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PersonalInfo label="Bio" value={teacher.bio} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherProfile;
