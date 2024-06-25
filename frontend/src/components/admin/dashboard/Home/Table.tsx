import React from 'react';
import Actions from './Actions';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  classId?: string | null;
}

interface TableProps {
  data: Person[];
  show: 'students' | 'teachers';
  startIndex: number;
  onDelete: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, show, startIndex, onDelete }) => {
  return (
    <table className="min-w-full border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="border py-2 px-4">No</th>
          <th className="border py-2 px-4">Name</th>
          <th className="border py-2 px-4">{show === 'students' ? 'Class' : 'Email'}</th>
          <th className="border py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((person, index) => {
          console.log('Person:', person); // Debugging line to inspect the person object
          return (
            <tr key={person.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border py-2 px-4">{startIndex + index + 1}</td>
              <td className="border py-2 px-4">{`${person.firstName} ${person.lastName}`}</td>
              <td className="border py-2 px-4">
                {show === 'students'
                  ? person.classId || 'No class'
                  : person.email}
              </td>
              <td className="border py-2 px-4">
                <Actions entityId={person.id} entityType={show === 'students' ? 'student' : 'teacher'} onDelete={onDelete} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
