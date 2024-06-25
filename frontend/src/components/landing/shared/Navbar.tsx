import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  const handleNavToggle = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navItems = [
    { id: 1, text: 'Home', link: '/' },
    { id: 2, text: 'About', link: '#about' },
    { id: 3, text: 'Teachers', link: '#teachers' },
    { id: 4, text: 'Students', link: '#students' },
    { id: 5, text: 'Courses', link: '#courses' },
    { id: 6, text: 'Contact', link: '#contact' },
  ];

  return (
    <div className={`fixed top-0 w-full z-20 flex justify-between items-center h-20 mx-auto px-4 text-white font-bold md:w-[90%] 2xl:w-[70%] ${scrolled ? 'bg-sky-500 opacity-65 w-full' : ''}`}>

      {/* Logo */}
      <h1 className='w-full md:text-2xl font-bold'>ALNAHDAH</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map((item) => (
          <li
            key={item.id}
            className='px-4 p-2 hover:bg-sky-600 hover:text-dark-purple rounded-md m-2 duration-300'
          >
            <a href={item.link} className='text-white cursor-pointer'>{item.text}</a>
          </li>
        ))}
        <li className='self-center'>
          <Link to="/login">
            <button type="button" className='text-white p-2 px-4 rounded-md ml-8 hover:text-white hover:bg-dark-purple bg-sky-400'>
              Login
            </button>
          </Link>
        </li>
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNavToggle} className='block md:hidden cursor-pointer'>
        {isNavOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={`${isNavOpen
          ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r boronr-r-gray-900 bg-sky-400 ease-in-out duration-500'
          : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
          }`}
      >
        {/* Mobile Logo */}
        <li>
          <h1 className='w-full text-3xl font-bold m-4'>ALNAHDAH</h1>
        </li>

        {/* Mobile Navigation Items */}
        {navItems.map((item, index) => (
          <li
            key={item.id}
            className={`p-4 border-b rounded-md hover:text-dark-purple hover:bg-white cursor-pointer ${index === 0 ? 'mt-8' : ''
              }`}
          >
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}

        {/* Login Button in Mobile Version */}
        <li>
          <Link to="/login">
            <div className='text-white font-bold p-4 border-b rounded-xl hover:text-white cursor-pointer mt-6 bg-dark-purple hover:bg-sky-400'>
              <button type='button' className=' rounded-md'>
                Login
              </button>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
