// StudentInteraction.tsx
import React from 'react';

interface Interaction {
  id: number;
  date: string;
  message: string;
  recipient: string;
}

const interactions: Interaction[] = [
  {
    id: 1,
    date: '2024-05-15',
    message: 'Reminder: Tomorrow’s homework deadline for Algebra.',
    recipient: 'Class 10A'
  },
  {
    id: 2,
    date: '2024-05-14',
    message: 'Field trip next week. Please sign the consent form.',
    recipient: 'Class 10B'
  },
  {
    id: 3,
    date: '2024-05-13',
    message: 'Well done on the science project presentations!',
    recipient: 'Class 9A'
  }
];

const StudentInteraction: React.FC = () => {
  return (
    <div className="p-4 mt-4 shadow rounded bg-white">
      <h2 className="text-lg font-semibold text-center">Recent Interactions</h2>
      <div className="mt-2">
        {interactions.map(interaction => (
          <div key={interaction.id} className="mt-2">
            <h4 className="font-semibold">{interaction.date}</h4>
            <p>{interaction.message}</p>
            <p className="text-sm text-gray-500">To: {interaction.recipient}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentInteraction;
