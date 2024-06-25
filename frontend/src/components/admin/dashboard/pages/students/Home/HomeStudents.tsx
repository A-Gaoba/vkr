import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentCard from './StudentCard';
import Pagination from '../../../helps/Pagination';
import usePagination from '../../../helps/usePagination';
import Loading from "../../../../../Loading";
import useFetchData from './useFetchData';

const Home: React.FC = () => {
  const { students, classes, loading } = useFetchData();
  const [filter, setFilter] = useState<number | null>(null);
  const itemsPerPage = 10;

  const getClassLevel = (classId: number | null): number => {
    const classData = classes.find(cls => cls.id === classId);
    return classData ? classData.level : -1;
  };

  const filteredStudents = filter
    ? students.filter(student => student.classId !== null && getClassLevel(student.classId) === filter)
    : students;

  const { currentPage, setCurrentPage, totalPages, paginatedItemsIndex } = usePagination(filteredStudents.length, itemsPerPage);
  const paginatedStudents = filteredStudents.slice(paginatedItemsIndex.startIndex, paginatedItemsIndex.endIndex);

  const handleFilterClick = (selectedFilter: number | null) => {
    setFilter(selectedFilter);
    setCurrentPage(1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-end text-white p-4">
        <Link to="/admin/students/add">
          <button type="button" className="bg-dark-purple p-2 text-white flex items-center mb-4">Add Student</button>
        </Link>
      </div>

      {/* Navbar for filtering */}
      <nav>
        <div className="flex items-center text-white">
          <span className="text-black text-lg font-semibold">Level:</span>
          <button
            type="button"
            className={`ml-4 bg-dark-purple p-2 rounded-sm ${filter === null ? 'text-dark-purple bg-white' : ''}`}
            onClick={() => handleFilterClick(null)}
          >
            All
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((classOption) => (
            <button
              type="button"
              key={classOption}
              className={`ml-4 bg-dark-purple p-2 rounded-sm text-sm${filter === classOption ? ' text-dark-purple bg-white' : ''}`}
              onClick={() => handleFilterClick(classOption)}
            >
              {`Class ${classOption}`}
            </button>
          ))}
        </div>
      </nav>

      {/* Student cards table */}
      <table className="mt-8 w-full">
        <thead>
          <tr>
            <th className="border p-1 text-center">No</th>
            <th className="border p-1 text-center">Image</th>
            <th className="border p-1 text-center">Name</th>
            <th className="border p-1 text-center">BirthDay</th>
            <th className="border p-1 text-center">City</th>
            <th className="border p-1 text-center">Class</th>
            <th className="border p-1 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map((student, index) => (
            <StudentCard
              key={student.id}
              student={student}
              index={index + 1}
              classLevel={getClassLevel(student.classId)}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

export default Home;
