import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGradeById } from './gradeService';
import { Grade } from './types';

const GradeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [grade, setGrade] = useState<Grade | null>(null);

  useEffect(() => {
    const fetchGrade = async () => {
      if (!id) {
        console.error('Error: id is undefined');
        return;
      }
      
      try {
        const response = await getGradeById(parseInt(id, 10));
        setGrade(response.data);
      } catch (error) {
        console.error('Error fetching grade:', error);
      }
    };
    fetchGrade();
  }, [id]);

  if (!grade) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Grade Details</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>ID:</strong> {grade.id}</p>
        <p><strong>Value:</strong> {grade.value}</p>
        <p><strong>Student Name:</strong> {grade.student.firstName} {grade.student.lastName}</p>
        <p><strong>Class Name:</strong> {grade.subject.class.name}</p>
        <p><strong>Subject Name:</strong> {grade.subject.name}</p>
        <p><strong>Semester:</strong> {grade.semester.term} - {grade.semester.year}</p>
      </div>
    </div>
  );
};

export default GradeDetails;
