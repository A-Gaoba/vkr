import React from 'react';
import { TeacherProfileProps, PersonalInfoProps, AcademicInfoProps, TeacherScheduleProps } from './interfaces';


export const PersonalInfo: React.FC<PersonalInfoProps> = ({ label, value }) => (
  <p className="mb-2 text-sm md:text-base">
    <span className="text-gray-700 font-bold">{label}:</span> {value ?? 'N/A'}
  </p>
);

export const AcademicInfo: React.FC<AcademicInfoProps> = ({ label, value }) => (
  <p className="mb-2 md:text-base text-sm">
    <span className="font-bold">{label}:</span> {value ?? 'N/A'}
  </p>
);

export const TeacherSchedule: React.FC<TeacherScheduleProps> = ({ day, date, time }) => (
  <p className="mb-2 text-sm md:text-base">
    <span className="text-gray-700 font-bold">Schedule:</span> {`${day}, ${date}, ${time}`}
  </p>
);

const TeacherProfile: React.FC<TeacherProfileProps> = ({
  id,
  firstName,
  middleName,
  lastName,
  image,
  gender,
  dateOfBirth,
  email,
  phone,
  yearsOfExperience,
  subjectsTaught,
  bio,
}) => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-6">
        <img
          // src={image || 'default-image.jpg'}
          src="../../../../../../public/person-svgrepo-com.svg"
          alt={`${firstName} ${lastName}`}
          className="w-32 h-32 rounded-full object-cover mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">{`${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`}</h1>
          <p className="text-gray-600">{bio}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Personal Information</h2>
          <PersonalInfo label="Gender" value={gender} />
          <PersonalInfo label="Date of Birth" value={dateOfBirth} />
          <PersonalInfo label="Email" value={email} />
          <PersonalInfo label="Phone" value={phone} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Professional Information</h2>
          <AcademicInfo label="Years of Experience" value={yearsOfExperience} />
          <AcademicInfo label="Subjects Taught" value={subjectsTaught.map(subject => subject.name).join(', ')} />
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
