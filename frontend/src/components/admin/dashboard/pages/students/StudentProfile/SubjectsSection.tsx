import React from 'react';
import { Subject } from '../StudentInterface';

interface SubjectsSectionProps {
  subjects: Subject[];
}

const SubjectsSection: React.FC<SubjectsSectionProps> = ({ subjects }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-blue-700">Subjects</h2>
      {subjects.length ? (
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Subject Name</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(subject => (
              <tr key={subject.id} className="bg-white border-b">
                <td className="px-6 py-4">{subject.name}</td>
                <td className="px-6 py-4">{subject.description}</td>
                <td className="px-6 py-4 text-blue-500">
                  {subject.teacher ? (
                    <span>
                      {subject.teacher.firstName} {subject.teacher.lastName}
                    </span>
                  ) : (
                    <p className='text-slate-300'>No teacher assigned</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No subjects listed for this class.</p>
      )}
    </div>
  );
};

export default SubjectsSection;
