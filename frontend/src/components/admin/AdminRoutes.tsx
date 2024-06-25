import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Layout = React.lazy(() => import('./dashboard/shared/Layout'));
const Dashboard = React.lazy(() => import('./dashboard/Home/Dashboard'));
// students
const Students = React.lazy(() => import('./dashboard/pages/students/Home/HomeStudents'));
const StudentProfile = React.lazy(() => import('./dashboard/pages/students/StudentProfile/StudentPage'));
const AddStudent = React.lazy(() => import('./dashboard/pages/students/Home/AddStudentttForm'));
//teachers
const Teachers = React.lazy(() => import('./dashboard/pages/teachers/HomeTeachers'));
const TeacherProfile = React.lazy(() => import('./dashboard/pages/teachers/TeacherPage'));
const AddTeacher = React.lazy(() => import('./dashboard/pages/teachers/AddTeacher'));
//classes
const ClassesList = React.lazy(() => import('./dashboard/pages/classes/HomeClasses'));
import ClassInfo from './dashboard/pages/classes/ClassInfo';
const CreateClass = React.lazy(() => import('./dashboard/pages/classes/CreateClass'));

//subjects
const SubjectsList = React.lazy(() => import('./dashboard/pages/Subjects/HomeSubjects'));
const SubjectPage = React.lazy(() => import('./dashboard/pages/Subjects/SubjectPage'));
const AddSubject = React.lazy(() => import('./dashboard/pages/Subjects/AddSubject'));

//grades
import GradeList from './dashboard/pages/grades/GradeList';
import CreateGrade from './dashboard/pages/grades/CreateGrade';
import EditGrade from './dashboard/pages/grades/EditGrade';
import GradeDetails from './dashboard/pages/grades/GradeDetails';
// attendence
const Attendence = React.lazy(() => import('./dashboard/pages/attendance/HomeAttandence'));
const NotFound = React.lazy(() => import('../NotFound'));

const AttendanceManagement = React.lazy(() => import('./dashboard/pages/attendance/AttendanceManagement'));


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<React.Suspense fallback={<div>Loading...</div>}><Layout /></React.Suspense>}>
        <Route index element={<React.Suspense fallback={<div>Loading...</div>}><Dashboard /></React.Suspense>} />

        {/* students routes */}
        <Route path="students" element={<React.Suspense fallback={<div>Loading...</div>}><Students /></React.Suspense>} />
        <Route path="students/:id" element={<React.Suspense fallback={<div>Loading...</div>}><StudentProfile /></React.Suspense>} />
        <Route path="students/add" element={<React.Suspense fallback={<div>Loading...</div>}><AddStudent /></React.Suspense>} />
        {/* <Route path="students/edit/:id" element={<React.Suspense fallback={<div>Loading...</div>}><EditStudent /></React.Suspense>} /> */}

        {/* teachers routes */}
        <Route path="teachers" element={<React.Suspense fallback={<div>Loading...</div>}><Teachers /></React.Suspense>} />
        <Route path="teachers/:id" element={<React.Suspense fallback={<div>Loading...</div>}><TeacherProfile /></React.Suspense>} />
        <Route path="teachers/add" element={<React.Suspense fallback={<div>Loading...</div>}><AddTeacher /></React.Suspense>} />

        {/* classes routes */}
        <Route path="classes" element={<React.Suspense fallback={<div>Loading...</div>}><ClassesList /></React.Suspense>} />
        <Route path="classes/:id" element={<React.Suspense fallback={<div>Loading...</div>}><ClassInfo /></React.Suspense>} />
        <Route path="classes/create" element={<React.Suspense fallback={<div>Loading...</div>}><CreateClass /></React.Suspense>} />

        {/* subjects routes */}
        <Route path="subjects" element={<React.Suspense fallback={<div>Loading...</div>}><SubjectsList /></React.Suspense>} />
        <Route path="subjects/add" element={<React.Suspense fallback={<div>Loading...</div>}><AddSubject /></React.Suspense>} />
        <Route path="subjects/:id" element={<React.Suspense fallback={<div>Loading...</div>}><SubjectPage /></React.Suspense>} />

        {/* grades routes */}
        <Route path="grades" element={<React.Suspense fallback={<div>Loading...</div>}><GradeList /></React.Suspense>} />
        <Route path="grades/create" element={<React.Suspense fallback={<div>Loading...</div>}><CreateGrade /></React.Suspense>} />
        <Route path="grades/:id" element={<React.Suspense fallback={<div>Loading...</div>}><GradeDetails /></React.Suspense>} />
        <Route path="grades/:id/edit" element={<React.Suspense fallback={<div>Loading...</div>}><EditGrade /></React.Suspense>} />

        <Route path="attendance" element={<React.Suspense fallback={<div>Loading...</div>}><AttendanceManagement /></React.Suspense>} />
        <Route path="*" element={<React.Suspense fallback={<div>Loading...</div>}><NotFound /></React.Suspense>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
