// Courses.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  imageUrl: string;
}

interface CoursesProps {
  courses: Course[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  return (
<section id='courses' className="flex flex-col justify-center items-center bg-gradient-to-r from-orange-100 via-blue-200 to-yellow-50 rounded-lg shadow-lg py-12 px-4 w-90 mx-auto my-auto">

      <h3 className="text-4xl font-bold text-center mb-12">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-slate-500">
          Explore Our Courses
        </span>
      </h3>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:w-[90%] 2xl:w-[70%]"
      >
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="p-4  shadow-black shadow-lg bg-gradient-to-r from-orange-100 via-blue-200 to-yellow-50 border-red-500 border-r-4 border-b-4 rounded-md flex flex-col justify-between"
          >
            <div>
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
              <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
              {/* <p className="text-gray-600">{course.description}</p> */}
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className=" bg-dark-purple bg-gradient-to-r from-sky-500 to-slate-500 text-white py-2 px-4 rounded-md mt-4"
            >
              Enroll Now
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Courses;
