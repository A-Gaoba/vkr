import React from 'react';
import { Subject } from './interfaces';

interface SubjectSelectorProps {
  subjects: Subject[];
  selectedSubjects: number[];
  handleSubjectsChange: (subjectId: number) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ subjects, selectedSubjects, handleSubjectsChange }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Select Subjects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map(subject => (
          <div key={subject.id} className="flex items-center">
            <input
              type="checkbox"
              id={`subject-${subject.id}`}
              checked={selectedSubjects.includes(subject.id)}
              onChange={() => handleSubjectsChange(subject.id)}
              className="mr-2"
            />
            <label htmlFor={`subject-${subject.id}`} className="text-gray-700">{subject.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
