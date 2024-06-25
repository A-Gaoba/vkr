import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  description: string;
  videoFileName: string;
}

const HeroComponent: React.FC<HeroProps> = ({ title, description, videoFileName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen flex items-center -mt-20"
    >
      <video autoPlay muted loop className="absolute inset-0 object-cover w-full h-full z-0">
        <source src={`/videos/${videoFileName}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-sky-300"
      ></motion.div>

      <div className="container mx-auto text-white z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl mb-8"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" bg-dark-purple hover:bg-sky-400 text-white font-bold py-2 px-4 rounded-md mr-4"
          >
            Learn More
          </motion.button>
          <Link to="/register">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-sky-400 hover:text-white text-dark-purple font-bold py-2 px-4 rounded-md"
          >
            Enroll Now
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroComponent;
