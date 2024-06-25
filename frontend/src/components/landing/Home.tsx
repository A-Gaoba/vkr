import React from 'react';
import Hero from './home/Hero';
import About from './about/About';
import Teachers from './teachers/TeachersList';
import Courses from './courses/CoursesList';
import Contact from "./contact/Contact"
import Students from './students/StudensList';
import { heroData, teachersData, studentsData, coursesData } from './data/data';

function Home() {
  return (
    <div>
      <Hero {...heroData} />
      <About />
      <Teachers teachers={teachersData} />
      <Courses courses={coursesData} />
      <Students students={studentsData} />
      <Contact />
    </div>
  )
}

export default Home