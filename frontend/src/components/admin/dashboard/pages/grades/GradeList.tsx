import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { getGrades, deleteGrade, getClasses } from './gradeService';
import { Grade, Class } from './types';

Modal.setAppElement('#root'); // Important for accessibility

const GradeList: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gradeToDelete, setGradeToDelete] = useState<Grade | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await getGrades();
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await getClasses();
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchGrades();
    fetchClasses();
  }, []);

  const handleDelete = async () => {
    if (gradeToDelete) {
      try {
        await deleteGrade(gradeToDelete.id);
        setGrades(grades.filter((grade) => grade.id !== gradeToDelete.id));
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error deleting grade:', error);
      }
    }
  };

  const openModal = (grade: Grade) => {
    setGradeToDelete(grade);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setGradeToDelete(null);
    setIsModalOpen(false);
  };

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassId(Number(event.target.value));
  };

  const filteredGrades = selectedClassId
    ? grades.filter((grade) => grade.subject.class.id === selectedClassId)
    : grades;

  const filteredClasses = selectedClassId
    ? classes.filter((classItem) => classItem.id === selectedClassId)
    : classes;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Grades</h1>
      <div className="mb-4">
        <label htmlFor="classFilter" className="block text-sm font-medium text-gray-700">Filter by Class</label>
        <select
          id="classFilter"
          value={selectedClassId || ''}
          onChange={handleClassChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">All Classes</option>
          {classes.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.name}
            </option>
          ))}
        </select>
      </div>
      <Link to="/admin/grades/create" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block">Create Grade</Link>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Value</th>
            <th className="py-2 px-4 border-b">Student Name</th>
            <th className="py-2 px-4 border-b">Class Name</th>
            <th className="py-2 px-4 border-b">Subject Name</th>
            <th className="py-2 px-4 border-b">Semester ID</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrades.map((grade) => (
            <tr key={grade.id}>
              <td className="py-2 px-4 border-b">{grade.id}</td>
              <td className="py-2 px-4 border-b">{grade.value}</td>
              <td className="py-2 px-4 border-b">{grade.student.firstName} {grade.student.lastName}</td>
              <td className="py-2 px-4 border-b">{grade.subject.class.name}</td>
              <td className="py-2 px-4 border-b">{grade.subject.name}</td>
              <td className="py-2 px-4 border-b">{grade.semester.id}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/admin/grades/${grade.id}`} className="bg-green-500 text-white py-1 px-2 rounded mr-2">View</Link>
                <Link to={`/admin/grades/${grade.id}/edit`} className="bg-yellow-500 text-white py-1 px-2 rounded mr-2">Edit</Link>
                <button
                  onClick={() => openModal(grade)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="bg-white p-4 rounded-md shadow-md max-w-md mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete the grade for {gradeToDelete?.student.firstName} {gradeToDelete?.student.lastName} in {gradeToDelete?.subject.name}?</p>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded mr-2"
          >
            Yes, Delete
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GradeList;
