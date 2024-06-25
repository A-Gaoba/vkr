import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PersonalInfoSection from './StudentProfile';
import AcademicInfoSection from './AcademicDetails';
import SubjectsSection from './SubjectsSection';
import AttendanceInfoSection from './AttendanceInfoSection';
import { Student, ClassDetails, Subject, Teacher } from '../StudentInterface';
import { API_BASE_URL } from '../../../../../../api/url';

const StudentPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const studentId = parseInt(id || '0', 10); // Default to '0' to avoid NaN
  const [student, setStudent] = useState<Student | null>(null);
  const [classDetails, setClassDetails] = useState<ClassDetails | null>(null);
  const [allClasses, setAllClasses] = useState<ClassDetails[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nextClass, setNextClass] = useState<ClassDetails | null>(null);

  useEffect(() => {
    const fetchStudentAndRelatedData = async () => {
      try {
        const studentResponse = await axios.get(`${API_BASE_URL}/students/${studentId}`);
        const studentData = studentResponse.data;
        setStudent(studentData);

        if (studentData.classId) {
          const [classResponse, classesResponse] = await Promise.all([
            axios.get(`${API_BASE_URL}/classes/${studentData.classId}`),
            axios.get(`${API_BASE_URL}/classes`),
          ]);
          setClassDetails(classResponse.data);
          setAllClasses(classesResponse.data);

          // Fetch subjects along with their teacher details
          const subjectsResponse = await axios.get(`${API_BASE_URL}/classes/${studentData.classId}/subjects`);
          const subjectsData = await Promise.all(subjectsResponse.data.map(async (subject: Subject) => {
            if (subject.teacherId) {
              const teacherResponse = await axios.get(`${API_BASE_URL}/teachers/${subject.teacherId}`);
              subject.teacher = teacherResponse.data;
            }
            return subject;
          }));

          setSubjects(subjectsData);

          const nextClassData = classesResponse.data.find(
            (cls: ClassDetails) => cls.level === classResponse.data.level + 1
          );
          setNextClass(nextClassData || null);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentAndRelatedData();
  }, [studentId]);

  const moveToNextLevel = async () => {
    if (student && nextClass) {
      try {
        await axios.put(`${API_BASE_URL}/students/${student.id}`, { classId: nextClass.id });
        const classResponse = await axios.get(`${API_BASE_URL}/classes/${nextClass.id}`);
        const subjectsResponse = await axios.get(`${API_BASE_URL}/classes/${nextClass.id}/subjects`);

        const subjectsData = await Promise.all(subjectsResponse.data.map(async (subject: Subject) => {
          if (subject.teacherId) {
            const teacherResponse = await axios.get(`${API_BASE_URL}/teachers/${subject.teacherId}`);
            subject.teacher = teacherResponse.data;
          }
          return subject;
        }));

        setClassDetails(classResponse.data);
        setSubjects(subjectsData);

        const nextClassData = allClasses.find(
          (cls: ClassDetails) => cls.level === classResponse.data.level + 1
        );
        setNextClass(nextClassData || null);

        toast.success(`${student.firstName} ${student.lastName} has been moved to Class ${nextClass.level}.`);
      } catch (error) {
        console.error('Failed to update student:', error);
        toast.error('Failed to move student to the next level.');
      }
    }
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div className="text-red-500">Student not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">{student.firstName} {student.lastName}'s Profile</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <PersonalInfoSection student={student} />
          <AcademicInfoSection
            studentId={student.id}
            classLevel={classDetails?.level}
            grades={student.grades}
            nextClass={nextClass}
            onMoveToNextLevel={() => setShowModal(true)}
          />
          <SubjectsSection subjects={subjects} />
          <AttendanceInfoSection attendanceInfo={student.attendanceInfo || { totalClassesAttended: undefined, attendancePercentage: undefined }} />
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Confirm Move"
        className="bg-white p-6 rounded-md shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Move</h2>
        <p>Are you sure you want to move {student.firstName} {student.lastName} to the next class level (Class {nextClass?.level})?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={moveToNextLevel}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            disabled={!nextClass}
          >
            Yes
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default StudentPage;
