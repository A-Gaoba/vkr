import React from 'react';
import AcademicInfo from './AcademicInfo';

interface Props {
  attendanceInfo: {
    totalClassesAttended: number | undefined;
    attendancePercentage: number | undefined;
  };
}

const AttendanceInfoSection: React.FC<Props> = ({ attendanceInfo }) => (
  <section className="mb-8 bg-white p-6 rounded-md shadow-md">
    <h2 className="md:text-xl font-semibold mb-2">Attendance Information</h2>
    <AcademicInfo label="Total Classes Attended" value={attendanceInfo.totalClassesAttended || 'N/A'} />
    <AcademicInfo label="Attendance Percentage" value={`${attendanceInfo.attendancePercentage || 'N/A'}%`} />
  </section>
);

export default AttendanceInfoSection;
