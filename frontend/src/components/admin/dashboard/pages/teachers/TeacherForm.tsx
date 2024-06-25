import React from 'react';
import { TeacherData } from './interfaces';

interface TeacherFormProps {
  teacherData: TeacherData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  classes: { id: number, name: string }[]; // Add this line
}

const TeacherForm: React.FC<TeacherFormProps> = ({ teacherData, handleInputChange, handleSubmit, classes }) => {
  const renderInput = (label: string, name: string, type: string = 'text', required: boolean = false, placeholder: string = '') => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}{required && <span className="text-black mr-2">*</span>}:
        <input
          type={type}
          name={name}
          value={(teacherData as any)[name]}
          onChange={handleInputChange}
          required={required}
          placeholder={placeholder}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </label>
    </div>
  );

  const renderSelect = (label: string, name: string, options: string[], required: boolean = false) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}{required && <span className="text-black mr-2">*</span>}:
        <select
          name={name}
          value={(teacherData as any)[name]}
          onChange={handleInputChange}
          required={required}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select {label}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
    </div>
  );

  const renderClassSelect = () => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Class:
        <select
          name="classId"
          value={teacherData.classId || ''}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Class</option>
          {classes.map(classObj => (
            <option key={classObj.id} value={classObj.id}>{classObj.name}</option>
          ))}
        </select>
      </label>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {renderInput('First Name', 'firstName', 'text', true, 'Enter first name')}
      {renderInput('Middle Name', 'middleName', 'text', false, 'Enter middle name')}
      {renderInput('Last Name', 'lastName', 'text', true, 'Enter last name')}
      {renderInput('Email', 'email', 'email', true, 'Enter email')}
      {renderInput('Password', 'password', 'password', true, 'Enter password')}
      {renderSelect('Gender', 'gender', ['MALE', 'FEMALE', 'OTHER'], true)}
      {renderInput('Date of Birth', 'dateOfBirth', 'date', false, 'Select date of birth')}
      {renderInput('Phone', 'phone', 'text', false, 'Enter phone number')}
      {renderInput('Years of Experience', 'yearsOfExperience', 'number', false, 'Enter years of experience')}
      {renderInput('Bio', 'bio', 'text', false, 'Enter bio')}
      {renderInput('Image URL', 'image', 'text', false, 'Enter image URL')}
      {renderClassSelect()} {/* Add this line */}

      <div className="col-span-full text-center">
        <button
          type="submit"
          className="bg-dark-purple text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Teacher
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;
