import React from 'react';
import { format } from 'date-fns';
import { StudentPageProps } from '../StudentInterface';
import { Link } from 'react-router-dom';

interface StudentCardProps {
  student: StudentPageProps;
  index: number;
  classLevel: number;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, index, classLevel }) => {
  const formattedDate = format(new Date(student.dateOfBirth), 'yyyy-MM-dd');

  return (
    <tr>
      <td className="border p-1 text-center">{index + 1}</td>
      <td className="border p-1 text-center">
        <div className="flex justify-center">
          <img 
          // src={student.image} 
          src="../../../../../../../public/person-svgrepo-com.svg"
          alt={`${student.firstName} ${student.lastName}`} className="w-8 h-8 object-cover rounded-full" />
        </div>
      </td>
      <td className="border p-1 text-center">{`${student.firstName} ${student.lastName}`}</td>
      <td className="border p-1 text-center">{formattedDate}</td>
      <td className="border p-1 text-center">{student.city}</td>
      <td className="border p-1 text-center">{classLevel}</td>
      <td className="border p-1 text-center">
        <Link to={`/admin/students/${student.id}`}>
          <button type="button" className="bg-dark-purple text-white px-4 py-2 rounded hover:bg-blue-600">View</button>
        </Link>
      </td>
    </tr>
  );
};

export default StudentCard;
