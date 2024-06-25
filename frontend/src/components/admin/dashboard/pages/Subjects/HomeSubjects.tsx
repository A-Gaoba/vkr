import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../../../api/url';

interface Subject {
  id: number;
  name: string;
  description?: string;
  teacher?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  class?: {
    id: number;
    name: string;
    level: number;
  };
}

const ListSubjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<{ id: number; name: string; level: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [subjectsResponse, classesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/subjects`),
          axios.get(`${API_BASE_URL}/classes`),
        ]);
        const sortedSubjects = subjectsResponse.data.sort((a: Subject, b: Subject) => a.name.localeCompare(b.name));
        const sortedClasses = classesResponse.data.sort((a: { level: number }, b: { level: number }) => a.level - b.level);
        setSubjects(sortedSubjects);
        setClasses(sortedClasses);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const filteredSubjects = filter
    ? subjects.filter(subject => subject.class && subject.class.id === filter)
    : subjects;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Subjects</h1>
        <Link to="/admin/subjects/add" className="mt-4 px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600">
          Add Subject
        </Link>
      </div>

      <div className="mb-4">
        <label className="mr-2">Filter by Class:</label>
        <select
          title='classes'
          className="p-2 border border-gray-300 rounded"
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSubjects.map(subject => (
          <div key={subject.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{subject.name}</h2>
            <p className="mb-2">{subject.description}</p>
            <p className="mb-2">
              Teacher: {subject.teacher ? `${subject.teacher.firstName} ${subject.teacher.lastName}` : 'None'}
            </p>
            <p className="mb-2">
              Class: {subject.class ? subject.class.name : 'None'}
            </p>
            <Link to={`/admin/subjects/${subject.id}`} className="mt-4 px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSubjects;
