import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (direction: 'next' | 'prev') => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-between mt-4">
    <button
      onClick={() => onPageChange('prev')}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300 disabled:opacity-50"
    >
      &lt; Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
      onClick={() => onPageChange('next')}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300 disabled:opacity-50"
    >
      Next &gt;
    </button>
  </div>
);

export default Pagination;
