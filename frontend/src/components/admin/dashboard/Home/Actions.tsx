import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
import { API_BASE_URL } from '../../../../api/url';



interface ActionsProps {
  entityId: number;
  entityType: 'student' | 'teacher';
  onDelete: (id: number) => void;
}

const Actions: React.FC<ActionsProps> = ({ entityId, entityType, onDelete }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    navigate(`/admin/${entityType}s/${entityId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/${entityType}s/${entityId}`);
      onDelete(entityId);
    } catch (error) {
      console.error(`Error deleting ${entityType}:`, error);
    }
  };

  return (
    <div>
      <button onClick={handleEdit} className="text-sm bg-indigo-600 hover:bg-sky-600 text-white py-1 px-3 rounded-lg mr-2">
        View
      </button>
      <button onClick={() => setShowModal(true)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg">
        Delete
      </button>
      {showModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete this ${entityType}?`}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Actions;
