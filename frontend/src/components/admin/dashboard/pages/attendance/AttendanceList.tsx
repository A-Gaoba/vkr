import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../../../Loading';
import Pagination from '../../helps/Pagination';
import usePagination from '../../helps/usePagination';
import { API_BASE_URL } from '../../../../../api/url';

interface Attendance {
  id: number;
  student: { firstName: string; lastName: string };
  class: { name: string };
  date: string;
  status: string;
}

const AttendanceList: React.FC = () => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/attendances`);
        setAttendances(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attendances:', error);
        setLoading(false);
      }
    };

    fetchAttendances();
  }, []);

  const { currentPage, setCurrentPage, totalPages, paginatedItemsIndex } = usePagination(attendances.length, itemsPerPage);
  const paginatedAttendances = attendances.slice(paginatedItemsIndex.startIndex, paginatedItemsIndex.endIndex);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <table className="mt-8 w-full">
        <thead>
          <tr>
            <th className="border p-1 text-center">No</th>
            <th className="border p-1 text-center">Student</th>
            <th className="border p-1 text-center">Class</th>
            <th className="border p-1 text-center">Date</th>
            <th className="border p-1 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAttendances.map((attendance, index) => (
            <tr key={attendance.id}>
              <td className="border p-1 text-center">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
              <td className="border p-1 text-center">{`${attendance.student.firstName} ${attendance.student.lastName}`}</td>
              <td className="border p-1 text-center">{attendance.class.name}</td>
              <td className="border p-1 text-center">{new Date(attendance.date).toLocaleDateString()}</td>
              <td className="border p-1 text-center">{attendance.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

export default AttendanceList;
