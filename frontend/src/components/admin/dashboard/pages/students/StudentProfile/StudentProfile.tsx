import React from 'react';
import { format } from 'date-fns';

import { Student } from '../StudentInterface';
interface Props {
  student: Student;
}


const PersonalInfoSection: React.FC<Props> = ({ student }) => {
  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

  const renderField = (label: string, value: string) => (
    <div className="flex items-center justify-between mb-4">
      <label className="font-semibold text-gray-700">{label}:</label>
      <span className="p-2 text-gray-800 flex-grow">{value}</span>
    </div>
  );

  const { firstName, middleName, lastName, dateOfBirth, email, phoneNumber, address } = student;
  const formattedDateOfBirth = format(new Date(dateOfBirth), 'MMMM dd, yyyy');
  const fullName = `${capitalize(firstName)} ${middleName ? capitalize(middleName) : ''} ${capitalize(lastName)}`.trim();

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <div className="flex justify-between items-center p-4">
        <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-indigo-300 shadow-lg">
          <img
            // Placeholder image URL, replace with actual image URL if available
            src="../../../../../../../public/person-svgrepo-com.svg"
            alt={fullName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          {renderField('Full Name', fullName)}
          {renderField('Date of Birth', formattedDateOfBirth)}
          {renderField('Email', email)}
        </div>
        <div className="space-y-4">
          {renderField('Phone Number', phoneNumber)}
          {renderField('Address', address)}
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;
