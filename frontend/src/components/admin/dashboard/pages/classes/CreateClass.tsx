import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClassData, Subject } from './interfaces';
import FormField from './FormField';
import LoadingSpinner from '../../../../Loading';
import { API_BASE_URL } from '../../../../../api/url';

const CreateClass: React.FC = () => {
  const initialClassData: ClassData = {
    name: '',
    level: 1,
    description: '',
    subjectIds: [], // Initial value for subject IDs
  };

  const [classData, setClassData] = useState<ClassData>(initialClassData);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/subjects`);
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects', error);
        setError('Failed to fetch subjects');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClassData({ ...classData, [name]: value });
  };

  const handleSubjectsChange = (subjectId: number) => {
    const newSelectedSubjects = classData.subjectIds?.includes(subjectId)
      ? classData.subjectIds.filter(id => id !== subjectId)
      : [...(classData.subjectIds || []), subjectId];

    setClassData({
      ...classData,
      subjectIds: newSelectedSubjects,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/classes`, classData);
      alert('Class created successfully');
      setClassData(initialClassData); // Reset the form fields
    } catch (error) {
      console.error('Error creating class', error);
      alert('Error creating class');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Class</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Class Name" type="text" name="name" value={classData.name} onChange={handleInputChange} required placeholder="Enter class name" />
        <FormField label="Class Level" type="number" name="level" value={classData.level} onChange={handleInputChange} required placeholder="Enter class level" />
        <FormField label="Description" type="text" name="description" value={classData.description} onChange={handleInputChange} required placeholder="Enter class description" />

        <div className="col-span-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjects">Subjects</label>
          <div className="flex flex-wrap gap-2">
            {subjects.map(subject => (
              <label key={subject.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={subject.id}
                  checked={classData.subjectIds?.includes(subject.id) || false}
                  onChange={() => handleSubjectsChange(subject.id)}
                />
                <span className="ml-2">{subject.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-full text-center">
          <button
            type="submit"
            className="bg-dark-purple text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClass;
