import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../../../Loading';
import { API_BASE_URL } from '../../../../../api/url';

interface ClassData {
  id: number;
  name: string;
  level: number;
  description: string;
  studentCount: number;
  teacherCount: number;
}

const ClassList: React.FC = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [classToDelete, setClassToDelete] = useState<ClassData | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const classResponse = await axios.get(`${API_BASE_URL}/classes`);
      const classData: ClassData[] = await Promise.all(
        classResponse.data.map(async (cls: ClassData) => {
          const studentResponse = await axios.get(`${API_BASE_URL}/classes/${cls.id}/students`);
          const teacherResponse = await axios.get(`${API_BASE_URL}/classes/${cls.id}/teachers`);
          return {
            ...cls,
            studentCount: studentResponse.data.length,
            teacherCount: teacherResponse.data.length,
          };
        })
      );

      // Sort classes by level
      const sortedClasses = classData.sort((a, b) => a.level - b.level);
      setClasses(sortedClasses);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (classToDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/classes/${classToDelete.id}`);
        setClasses(classes.filter(cls => cls.id !== classToDelete.id));
        setShowModal(false);
        setClassToDelete(null);
        setDeleteError(null);
      } catch (error) {
        console.error('Error deleting class:', error);
        setDeleteError("you can't dlete this class.");
      }
    }
  };

  const confirmDelete = (cls: ClassData) => {
    setClassToDelete(cls);
    setShowModal(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Class List</h1>
        {/* <Link to="create" className="mt-4 px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600">
          Add Class
        </Link> */}
      </div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">No</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Students</th>
            <th className="px-4 py-2 text-left">Teachers</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={cls.id} className="bg-white border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{cls.name}</td>
              <td className="px-4 py-2">{cls.description}</td>
              <td className="px-4 py-2">{cls.studentCount}</td>
              <td className="px-4 py-2">{cls.teacherCount}</td>
              <td className="px-4 py-2 flex gap-2">
                <Link to={`/admin/classes/${cls.id}`} className="px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600">
                  View
                </Link>
                <button
                  onClick={() => confirmDelete(cls)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && classToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete the class "{classToDelete.name}"?</p>
            {deleteError && <p className="text-red-500">{deleteError}</p>}
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
