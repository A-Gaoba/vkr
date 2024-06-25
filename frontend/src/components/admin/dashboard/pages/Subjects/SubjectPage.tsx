import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '../../../../../api/url';

interface Subject {
  id: number;
  name: string;
  description?: string;
  teacherId?: number;
  classId?: number;
}

interface Class {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
}

const SubjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [subjectResponse, classesResponse, teachersResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/subjects/${id}`),
          axios.get(`${API_BASE_URL}/classes`),
          axios.get(`${API_BASE_URL}/teachers`),
        ]);
        setSubject(subjectResponse.data);
        setClasses(classesResponse.data);
        setTeachers(teachersResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSubject(prevSubject => prevSubject ? { ...prevSubject, [name]: value } : null);
  };

  const handleSave = async () => {
    if (subject) {
      try {
        await axios.put(`${API_BASE_URL}/subjects/${id}`, subject);
        if (subject.teacherId) {
          await axios.post(`${API_BASE_URL}/subjects/assign-teacher`, {
            subjectId: subject.id,
            teacherId: parseInt(subject.teacherId as unknown as string),
          });
        }
        toast.success('Subject updated successfully');
      } catch (err) {
        console.error('Error updating subject:', err);
        toast.error('Failed to update subject');
      }
    }
    setShowSaveConfirm(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/subjects/${id}`);
      toast.success('Subject deleted successfully');
      navigate('/admin/subjects');
    } catch (err) {
      console.error('Error deleting subject:', err);
      toast.error('Failed to delete subject');
    }
    setShowDeleteConfirm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!subject) {
    return <div className="text-red-500">Subject not found</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Edit Subject</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          placeholder="Write subject name"
          name="name"
          value={subject.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={subject.description || ''}
          onChange={handleInputChange}
          placeholder="Subject description"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Class</label>
        <select
          name="classId"
          title="class id"
          value={subject.classId || ''}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a class</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Teacher</label>
        <select
          name="teacherId"
          title="teacher id"
          value={subject.teacherId || ''}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a teacher</option>
          {teachers.map(teacher => (
            <option key={teacher.id} value={teacher.id}>{`${teacher.firstName} ${teacher.lastName}`}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center">
        <button onClick={() => setShowSaveConfirm(true)} className="px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600">
          Save
        </button>
        <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
          Delete
        </button>
      </div>

      {/* Save Confirmation Modal */}
      {showSaveConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4">Confirm Save</h2>
            <p className="mb-4">Are you sure you want to save the changes?</p>
            <div className="flex justify-end">
              <button onClick={handleSave} className="px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600 mr-2">
                Yes
              </button>
              <button onClick={() => setShowSaveConfirm(false)} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this subject?</p>
            <div className="flex justify-end">
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">
                Yes
              </button>
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
