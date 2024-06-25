import React, { useState } from 'react';
import axios from 'axios';
import FormField from './FormField';
import useFetchData from './useFetchData';
import LoadingSpinner from '../../../../../Loading';
import { API_BASE_URL } from '../../../../../../api/url';

const AddStudentForm: React.FC = () => {
  const { classes, loading } = useFetchData();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    city: '',
    image: '',
    gender: 'OTHER',
    classId: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const parseValue = (fieldName: string, fieldValue: string) => {
      if (['classId'].includes(fieldName)) {
        return fieldValue ? parseInt(fieldValue, 10) : ''; // Ensure empty string if parsing fails
      }
      return fieldValue;
    };
    setFormData(prev => ({ ...prev, [name]: parseValue(name, value) }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/students`, formData);
      alert('Student added successfully!');
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        phoneNumber: '',
        address: '',
        city: '',
        image: '',
        gender: 'OTHER',
        classId: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add student. Please check the console for more details.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <FormField label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter first name" className="col-span-1" required />
      <FormField label="Middle Name" type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} placeholder="Enter middle name" className="col-span-1" />
      <FormField label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter last name" className="col-span-1" required />
      <FormField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" className="col-span-1" required />
      <FormField label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter password" className="col-span-1" required />
      <FormField label="Date of Birth" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} placeholder="Enter date of birth" className="col-span-1" required />
      <FormField label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Enter phone number" className="col-span-1" required />
      <FormField label="Address" type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" className="col-span-2" required />
      <FormField label="City" type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter city" className="col-span-1" required />
      <FormField label="Image URL" type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="Enter image URL" className="col-span-1" />
      <FormField label="Gender" type="select" name="gender" value={formData.gender} onChange={handleInputChange} placeholder="Select gender" className="col-span-1" required options={[
        { id: 'MALE', level: 'MALE' },
        { id: 'FEMALE', level: 'FEMALE' },
        { id: 'OTHER', level: 'OTHER' }
      ]} />
      <FormField label="Class ID" type="select" name="classId" value={formData.classId} onChange={handleInputChange} placeholder="Select class" required options={classes.map(cls => ({ id: cls.id, level: `Level ${cls.level}` }))} className="col-span-1" />
      <div className="col-span-full">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Add Student
        </button>
      </div>
    </form>
  );
};

export default AddStudentForm;