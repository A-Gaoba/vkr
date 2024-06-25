import React from 'react';
import axios from 'axios';

interface Props {
  id: number;
}

const DeleteClassButton: React.FC<Props> = ({ id }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/classes/${id}`);
      console.log('Class deleted successfully');
      // Redirect or update UI
    } catch (error) {
      console.error('Failed to delete class:', error);
    }
  };

  return <button onClick={handleDelete}>Delete Class</button>;
};

export default DeleteClassButton;
