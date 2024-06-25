// ClassFilter.tsx
import React from 'react';

interface ClassFilterProps {
  classes: string[];
  selectedClass: string;
  onClassChange: (classId: string) => void;
}

const ClassFilter: React.FC<ClassFilterProps> = ({ classes, selectedClass, onClassChange }) => {

  
  return (
    <div className="mb-4">
      <label htmlFor="classFilter" className="block text-gray-700 text-sm font-bold mb-2">
        Filter by Class:
      </label>
      <select
        id="classFilter"
        value={selectedClass}
        onChange={(e) => onClassChange(e.target.value)}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="All">All</option>
        {classes.map((classId) => (
          <option key={classId} value={classId}>
            {classId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassFilter;
