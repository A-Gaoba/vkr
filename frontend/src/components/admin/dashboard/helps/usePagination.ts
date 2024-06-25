import { useState } from "react";

const usePagination = (itemsCount: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(itemsCount / itemsPerPage);

  const paginatedItemsIndex = {
    startIndex: (currentPage - 1) * itemsPerPage,
    endIndex: (currentPage - 1) * itemsPerPage + itemsPerPage,
  };

  return { currentPage, setCurrentPage, totalPages, paginatedItemsIndex };
};

export default usePagination;
