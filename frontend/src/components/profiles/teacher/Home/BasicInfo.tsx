import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

interface BasicInfoProps {
  teacherName: string;
  profilePicture: string;
  contactInfo: string;
  bio: string;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  teacherName,
  profilePicture,
  contactInfo,
  bio,
}) => {
  return (
    <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 rounded-md shadow-lg mb-6">
      <div className="flex items-center mb-6">
        <img
          src={profilePicture}
          alt={`${teacherName}'s Profile`}
          className="rounded-full h-24 w-24 border-4 border-white"
        />
        <div className="ml-6">
          <h2 className="text-4xl font-extrabold text-white">{teacherName}</h2>
          <div className="flex items-center mt-2">
            <FaEnvelope className="text-white mr-2" />
            <p className="text-white">{contactInfo}</p>
          </div>
        </div>
      </div>
      <p className="text-white">{bio}</p>
    </div>
  );
};

export default BasicInfo;