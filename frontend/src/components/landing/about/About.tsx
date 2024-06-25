import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div id="about" className="flex flex-col justify-center items-center bg-gradient-to-r from-orange-100 via-blue-200 to-yellow-50 rounded-lg shadow-lg py-12 px-4">
      <h3 className="text-4xl font-bold text-center mb-12">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-slate-500">
          About Us
        </span>
      </h3>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-[90%] 2xl:w-[70%]"
        id="about"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">

          <div className="flex  flex-col justify-evenly h-full">
            <div>
              <h2 className="font-bold text-3xl mb-5">
                Welcome to Our School Community
              </h2>
              <p className="text-black text-lg leading-7 mb-6">
                Embrace a journey of knowledge and growth within our{" "}
                <span className="text-sky-400 font-bold">vibrant school community</span>. We are committed to providing a nurturing environment that fosters{" "}
                <span className="text-sky-400 font-bold">academic excellence</span> and personal development. Join us in shaping a brighter future for every student.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="py-3 px-6 text-lg bg-dark-purple text-white rounded-lg font-bold hover:bg-sky-300 hover:text-black transition duration-300 inline-block"
              >
                Learn More
              </motion.a>
            </div>
          </div>


          <div className="border-3 border-teal-600 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="School Community"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div >
    </div>
  );
};

export default About;
