import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import Menus from "../data/index";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubMenuIndexes, setOpenSubMenuIndexes] = useState<number[]>([]);
  const [hoveredElement, setHoveredElement] = useState(null);



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (index) => {
    setOpenSubMenuIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const isSubMenuOpen = (index) => openSubMenuIndexes.includes(index);

  const handleMouseEnter = (element) => {
    if (!isOpen) {
      setHoveredElement(element);
    }
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  const renderSubMenu = (subMenuItems, parentIndex) => (
    <ul>
      {subMenuItems.map((item, index) => (
        <Link to={item.path} key={index}>
          <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 md:px-8 ml-2 "
            onMouseEnter={() => handleMouseEnter(item.title)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={`/assets/admin/${item.src}.svg`}
              alt="image of the element"
              className="w-5 h-5"
            />
            {hoveredElement === item.title && (
              <div className="absolute bg-white text-black p-2 rounded-md ml-6">
                {item.title}
              </div>)}
            <span className={`${!isOpen && "hidden"} origin-left duration-200 py-2`}>
              {item.title}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );


  return (
    <div className="flex mih-h-full">
      <div
        className={`${isOpen ? "w-72" : "w-20"
          } bg-dark-purple p-5 pt-1 relative duration-300 min-h-screen`}
      >
        <div className="flex items-center">
          <div className="flex gap-x-4 items-center ">
            <img
              src="/assets/admin/logo.svg"
              alt="logo"
              className="cursor-pointer w-12 h-12"
            />
            <h1 className="font-bold text-2xl hidden md:flex text-white">
              ALNAHDAH
            </h1>
          </div>
        </div>
        <img
          src="/assets/admin/control.svg"
          alt="image for control"
          className={`absolute cursor-pointer -right-3 top-11 w-7 bg-dark-purple border-dark-purple border-2 rounded-full  ${!isOpen && "rotate-180"
            }`}
          onClick={toggleSidebar}
        />
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${menu.gap ? "mt-9" : "mt-2"
                  } ${index === 0 && "bg-light-white"}`}
                onMouseEnter={() => handleMouseEnter(menu.title)}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleSubMenu(index)}
              >
                <img
                  src={`/assets/admin/${menu.src}.svg`}
                  alt="image of the element"
                  className="w-6 h-6"
                />
                {hoveredElement === menu.title && (
                  <div className="absolute bg-white text-black p-2 rounded-md ml-12">
                    {menu.title}
                  </div>
                )}

                <span className={`${!isOpen && "hidden"} origin-left duration-200 py-2`}>
                  {menu.title}
                </span>
                {menu.submenu && isOpen && (
                  <FaAngleDown
                    className={`ml-16 ${isSubMenuOpen(index) && "rotate-180"}`}
                  />
                )}
              </li>
              {menu.submenu && isSubMenuOpen(index) && renderSubMenu(menu.subMenuItem, index)}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
