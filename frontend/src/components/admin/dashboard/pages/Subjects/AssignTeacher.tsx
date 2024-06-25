import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../../api/url';

const AssignTeacher: React.FC = () => {
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([]);
  const [teachers, setTeachers] = useState<{ id: number; firstName: string; lastName: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsResponse, teachersResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/subjects`),
          axios.get(`${API_BASE_URL}/teachers`)
        ]);
        setSubjects(subjectsResponse.data);
        setTeachers(teachersResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Failed to fetch subjects or teachers');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/subjects/assign-teacher`, { subjectId, teacherId });
      alert('Teacher assigned to subject successfully');
      setSubjectId(null);
      setTeacherId(null);
    } catch (error) {
      console.error('Error assigning teacher to subject', error);
      alert('Error assigning teacher to subject');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Assign Teacher to Subject</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Subject <span className="text-black">*</span>:</label>
          <select
            id="subject"
            value={subjectId || ''}
            onChange={(e) => setSubjectId(Number(e.target.value))}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            title="Select Subject"
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teacher">Teacher <span className="text-black">*</span>:</label>
          <select
            id="teacher"
            value={teacherId || ''}
            onChange={(e) => setTeacherId(Number(e.target.value))}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            title="Select Teacher"
          >
            <option value="">Select Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{`${teacher.firstName} ${teacher.lastName}`}</option>
            ))}
          </select>
        </div>
        <div className="col-span-full text-center">
          <button type="submit" className="bg-dark-purple text-white px-4 py-2 rounded hover:bg-blue-600">
            Assign Teacher
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignTeacher;
