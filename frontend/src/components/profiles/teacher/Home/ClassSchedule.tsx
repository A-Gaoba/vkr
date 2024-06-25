// ClassSchedule.js
import React from 'react';

interface ScheduleItem {
  day: string;
  time: string;
  courseName: string;
  room: string;
}

interface ClassScheduleProps {
  schedule: ScheduleItem[];
}


const ClassSchedule: React.FC<ClassScheduleProps> = ({ schedule }) => {
  if (schedule.length === 0) {
    return <div className="p-4 mt-4 shadow rounded bg-white text-center">No schedule available.</div>;
  }

  return (
    <div className="p-4 mt-4 shadow rounded bg-white">
      <h2 className="text-lg font-semibold text-center">Class Schedule</h2>
      <table className="w-full mt-2">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Course</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>9:00</td>
            <td>Math</td>
            <td>4-321</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ClassSchedule;
