import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../../../Loading';
import useFetchData from './useFetchData';
import FormField from './FormField';
import { API_BASE_URL } from '../../../../../api/url';

interface AttendanceFormProps {
  onSuccess: () => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ onSuccess }) => {
  const { students, classes, loading } = useFetchData();
  const [formData, setFormData] = useState({
    studentId: '',
    classId: '',
    date: '',
    status: 'Present',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/attendances`, {
        ...formData,
        studentId: parseInt(formData.studentId, 10),
        classId: parseInt(formData.classId, 10),
      });
      alert('Attendance record added successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add attendance record. Please check the console for more details.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <FormField label="Student" type="select" name="studentId" value={formData.studentId} onChange={handleInputChange} options={students} optionKey="id" optionLabel="firstName" className="col-span-1" />
      <FormField label="Class" type="select" name="classId" value={formData.classId} onChange={handleInputChange} options={classes} optionKey="id" optionLabel="name" className="col-span-1" />
      <FormField label="Date" type="date" name="date" value={formData.date} onChange={handleInputChange} className="col-span-1" />
      <FormField label="Status" type="select" name="status" value={formData.status} onChange={handleInputChange} options={[{ id: 'Present', name: 'Present' }, { id: 'Absent', name: 'Absent' }]} optionKey="id" optionLabel="name" className="col-span-1" />
      <div className="col-span-full">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Add Attendance
        </button>
      </div>
    </form>
  );
};

export default AttendanceForm;
