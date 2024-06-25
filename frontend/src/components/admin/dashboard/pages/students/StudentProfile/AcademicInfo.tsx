import React from 'react';


export interface AcademicInfoProps {
  label: string;
  value: string | number;
}

const AcademicInfo: React.FC<AcademicInfoProps> = ({ label, value }) => (
  <p className="mb-2 md:text-base text-sm">
    <span className="font-bold">{label}:</span> {value}
  </p>
);

export default AcademicInfo;
