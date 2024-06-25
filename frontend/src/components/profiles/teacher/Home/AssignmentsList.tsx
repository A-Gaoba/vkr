import React from 'react';

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  courseName: string;
}

const AssignmentsList: React.FC = () => {
  // Mock assignment data
  const assignments: Assignment[] = [
    {
      id: 1,
      title: 'Assignment on Russian Grammar',
      dueDate: '2024-05-20',
      description: 'Complete the exercise on verbs and nouns in Russian.',
      courseName: 'Intro to Russian'
    },
    {
      id: 2,
      title: 'Math Homework: Linear Algebra',
      dueDate: '2024-05-22',
      description: 'Solve all the problems in Chapter 4 of the textbook.',
      courseName: 'Advanced Mathematics'
    },
    {
      id: 3,
      title: 'Science Report on Electricity',
      dueDate: '2024-05-25',
      description: 'Prepare a report on the history and principles of electricity.',
      courseName: 'General Science'
    }
  ];

  return (
    <div className="p-6 mx-auto rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Assignments</h2>
      {assignments.length > 0 ? (
        <ul className="divide-y divide-gray-300 flex gap-2">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="p-4 bg-white">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">{assignment.title}</h3>
              <p className="text-sm text-gray-600 ">Due: {assignment.dueDate}</p>
              <p className="text-sm text-gray-600 ">Course: {assignment.courseName}</p>
              <p className="mt-1 text-gray-500 ">{assignment.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No assignments found.</p>
      )}
    </div>
  );
}

export default AssignmentsList;
