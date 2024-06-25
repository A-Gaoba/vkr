import React from 'react';
import { FaBook, FaInfoCircle } from 'react-icons/fa';

interface Course {
  title: string;
  code: string;
  description: string;
  imageUrl: string;
}

interface CoursesListProps {
  courses: Course[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, index) => (
        <div key={index} className="bg-white rounded-md overflow-hidden shadow-lg">
          <img
            src={course.imageUrl}
            alt={`${course.title} - ${course.code}`}
            className="w-full h-40 object-cover object-center rounded-t-md"
          />
          <div className="p-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {course.title} - {course.code}
            </h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center justify-between">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple flex">
                <FaInfoCircle className="mr-2" /> View Details
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple flex">
                <FaBook className="mr-2" /> Enroll Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesList;