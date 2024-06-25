// LectureSchedule.tsx

import React from 'react';

interface Lecture {
  day: string;
  time: string;
  course: string;
  room: string;
}

interface LectureScheduleProps {
  lectures: Lecture[];
}

const LectureSchedule: React.FC<LectureScheduleProps> = ({ lectures }) => {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4">Lecture Schedule</h2>
      {lectures.length > 0 ? (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Day</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Room</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture, index) => (
              <tr key={index}>
                <td className="border p-2">{lecture.day}</td>
                <td className="border p-2">{lecture.time}</td>
                <td className="border p-2">{lecture.course}</td>
                <td className="border p-2">{lecture.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No lectures scheduled.</p>
      )}
    </div>
  );
};

export default LectureSchedule;