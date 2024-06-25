import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../../api/url';

const useFetchData = () => {
  const [students, setStudents] = useState<{ id: number; firstName: string; lastName: string }[]>([]);
  const [classes, setClasses] = useState<{ id: number; name: string; level: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, classesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/students`),
          axios.get(`${API_BASE_URL}/classes`),
        ]);

        setStudents(studentsResponse.data);
        setClasses(classesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { students, classes, loading };
};

export default useFetchData;
