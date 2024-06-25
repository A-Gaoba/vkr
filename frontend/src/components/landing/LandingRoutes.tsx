import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Home from './Home';
import Footer from './shared/Footer';
const NotFound = React.lazy(() => import('../NotFound'));
import Courses from './courses/CoursesList';
import { coursesData } from './data/data';


const LandingRoutes = () => {
  return (
    <div className='bg-white bg-gradient-to-r from-orange-100 via-blue-200 to-yellow-50 flex flex-col justify-center items-center'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses courses={coursesData}/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default LandingRoutes;
