import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TeacherData, Subject } from './interfaces';
import SubjectSelector from './SubjectSelector';
import TeacherForm from './TeacherForm';
import { API_BASE_URL } from '../../../../../api/url';

const CreateTeacher: React.FC = () => {
  const initialTeacherData: TeacherData = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    gender: 'OTHER',
    dateOfBirth: '',
    phone: '',
    yearsOfExperience: 0,
    bio: '',
    image: '',
    classId: undefined, // Add this line
    subjectsTaught: [] // Array of subject IDs
  };

  const [teacherData, setTeacherData] = useState<TeacherData>(initialTeacherData);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<{ id: number, name: string }[]>([]); // Add this line
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/classes`); // Assume this endpoint exists
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes', error);
      }
    };

    fetchClasses(); // Add this line
  }, []);

  const fetchSubjectsForClass = async (classId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/classes/${classId}/subjects`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects for class', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'yearsOfExperience') {
      setTeacherData({
        ...teacherData,
        [name]: parseInt(value, 10)
      });
    } else if (name === 'classId') {
      const classId = parseInt(value, 10);
      setTeacherData({
        ...teacherData,
        [name]: classId
      });
      fetchSubjectsForClass(classId);
    } else {
      setTeacherData({
        ...teacherData,
        [name]: value
      });
    }
  };

  const handleSubjectsChange = (subjectId: number) => {
    const newSelectedSubjects = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter(id => id !== subjectId)
      : [...selectedSubjects, subjectId];

    setSelectedSubjects(newSelectedSubjects);
    setTeacherData({
      ...teacherData,
      subjectsTaught: newSelectedSubjects
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting teacher data:", teacherData);
    try {
      await axios.post(`${API_BASE_URL}/teachers`, teacherData);
      alert('Teacher created successfully');
      setTeacherData(initialTeacherData); // Reset the form fields
      setSelectedSubjects([]);
    } catch (error) {
      console.error('Error creating teacher', error);
      alert('Error creating teacher');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Teacher</h1>
      <TeacherForm
        teacherData={teacherData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        classes={classes} // Pass classes to TeacherForm
      />
      <SubjectSelector
        subjects={subjects}
        selectedSubjects={selectedSubjects}
        handleSubjectsChange={handleSubjectsChange}
      />
    </div>
  );
};

export default CreateTeacher;
