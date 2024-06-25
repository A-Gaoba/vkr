import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent: React.FC = () => {
  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4">Calendar</h2>
      <Calendar className="border rounded-lg w-full" />
    </div>
  );
};

export default CalendarComponent;
