import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface InfoCardProps {
  label: string;
  count: number;
  link: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, count, link }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <div className="flex flex-col items-start">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-indigo-100 rounded-full">
          <FaArrowRight className="text-indigo-600 text-xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 ml-3">{label}</h2>
      </div>
      <p className="text-lg text-gray-600 mb-4">{`Total ${label}: ${count}`}</p>
      <a 
        href={link} 
        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 font-medium"
        aria-label={`View ${label}`}
      >
        <span>View {label}</span>
        <FaArrowRight className="ml-2" />
      </a>
    </div>
  </div>
);

export default InfoCard;
