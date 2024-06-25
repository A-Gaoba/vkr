import { useState, useEffect } from "react";
import axios from "axios";
import { StudentPageProps, Class } from "../StudentInterface";
import { API_BASE_URL } from "../../../../../../api/url";

const useFetchData = () => {
  const [students, setStudents] = useState<StudentPageProps[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, classesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/students`),
          axios.get(`${API_BASE_URL}/classes`),
        ]);
        setStudents(studentsResponse.data);
        setClasses(classesResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { students, classes, loading };
};

export default useFetchData;
