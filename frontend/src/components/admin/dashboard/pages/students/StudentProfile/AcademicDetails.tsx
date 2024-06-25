import React from 'react';
import AcademicInfo from './AcademicInfo';
import { Grade, ClassDetails } from '../StudentInterface';

interface Props {
  studentId: number;
  classLevel: number | undefined;
  grades: Grade[] | undefined;
  nextClass: ClassDetails | null;
  onMoveToNextLevel: () => void;
}

const AcademicInfoSection: React.FC<Props> = ({ studentId, classLevel, grades, nextClass, onMoveToNextLevel }) => (
  <section className="mb-8 bg-white p-6 rounded-md shadow-md">
    <div className="flex justify-between items-center">
      <h2 className="md:text-xl font-semibold mb-2">Academic Information</h2>
      <button
        onClick={onMoveToNextLevel}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={!nextClass}
      >
        Move to Next Level
      </button>
    </div>
    <AcademicInfo label="Student ID" value={studentId} />
    <AcademicInfo label="Class" value={`Class ${classLevel ? classLevel : 'undefined'}`} />
  </section>
);

export default AcademicInfoSection;
