import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  return (
    <div id='contact' className="bg-gradient-to-r from-orange-100 via-blue-200 to-yellow-50 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="container mx-auto flex items-center justify-center flex-wrap gap-8 p-8 rounded-lg shadow-black shadow-lg w-[90%] 2xl:w-[70%]"
      >
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
          className="flex-1 "
        >
          <h2 className="text-3xl font-bold text-dark-purple md:mb-8">
            Get In Touch With Us
          </h2>
          <p className="text-gray-700 mb-14">
            We'd love to hear from you. Whether you have questions about our
            programs, admissions, or anything else, feel free to reach out.
          </p>
          <p className="text-gray-700 mb-2">
            <FontAwesomeIcon icon={faPhone} className="mr-2 text-dark-purple" />
            (555) 123-4567
          </p>
          <p className="text-gray-700 mb-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-dark-purple" />
            info@example.com
          </p>
          <p className="text-gray-700 mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-dark-purple" />
            123 School St, Cityville
          </p>

          {/* Social Media Icons */}
          <div className="flex mt-4">
            <a href="#" className="text-dark-purple mr-5">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
              {/* facebook */}
            </a>
            <a href="#" className="text-dark-purple mr-5">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
              {/* twitter */}
            </a>
            <a href="#" className="text-dark-purple mr-5">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
              {/* instagram */}
            </a>
            <a href="#" className="text-dark-purple">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" />
              {/* whatsapp */}
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
          className="flex-1"
        >

          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Fields */}
            <div className="mb-4">
              <label htmlFor="name" className="text-dark-purple text-lg mb-2 block">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="w-full py-2 px-4 bg-gray-100 rounded-md focus:outline-none focus:ring focus:border-sky-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-dark-purple text-lg mb-2 block">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="w-full py-2 px-4 bg-gray-100 rounded-md focus:outline-none focus:ring focus:border-sky-300"
              />
            </div>
            <div className="col-span-2 mb-4">
              <label htmlFor="message" className="text-dark-purple text-lg mb-2 block">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                rows={4}
                className="w-full py-2 px-4 bg-gray-100 rounded-md focus:outline-none focus:ring focus:border-sky-300"
              />
            </div>
            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-sky-300 bg-gradient-to-r from-sky-500 to-slate-500 hover:bg-sky-400 text-white font-bold py-3 px-6 rounded-md col-span-2"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
