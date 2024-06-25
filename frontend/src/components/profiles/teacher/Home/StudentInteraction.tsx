// StudentInteraction.tsx

import React from 'react';

interface StudentInteractionProps {
  email: string;
  messagingLink: string;
}

const StudentInteraction: React.FC<StudentInteractionProps> = ({ email, messagingLink }) => {
  return (
    <div className="border p-4 mb-4">
      <h2 className="text-2xl font-bold mb-4">Student Interaction</h2>
      <p>Email: {email}</p>
      <p>Messaging: <a href={messagingLink} target="_blank" rel="noopener noreferrer">Click here to message</a></p>
    </div>
  );
};

export default StudentInteraction;