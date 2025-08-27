import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IoHome } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa6";
import { IoMoonOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  // Función para cambiar ruta
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-20 z-50 flex items-center justify-center bg-white dark:bg-gray-900 border-t border-gray-300 rounded-t-3xl shadow-2xl">
      <button
        onClick={() => handleNavigate("/")}
        className={`flex justify-center items-center rounded-lg p-4 h-20 w-20 cursor-pointer hover:scale-105 ${
          path === "/" ? "text-cyan-700" : ""
        }`}
      >
        <IoHome className="text-3xl" />
      </button>
      <button
        onClick={() => handleNavigate("/share")}
        className="flex justify-center items-center rounded-lg p-4 h-20 w-20 cursor-pointer hover:scale-105"
      >
        <IoMdShare
          className={`${path === "/share" ? "text-cyan-700" : ""} text-3xl`}
        />
      </button>
      {/*BOTÓN CENTRAL*/}
      <button
        onClick={() => handleNavigate("/add")}
        className="flex justify-center items-center bg-cyan-700 rounded-lg p-4 text-white -mt-8 shadow-lg h-20 w-20 cursor-pointer hover:scale-105"
      >
        <FaPersonCirclePlus className="text-5xl" />
      </button>
      <button
        onClick={() => handleNavigate("/notifications")}
        className="flex justify-center items-center rounded-lg p-4 h-20 w-20 cursor-pointer hover:scale-105"
      >
        <FaRegBell
          className={`${
            path === "/notifications" ? "text-cyan-700" : ""
          } text-3xl`}
        />
      </button>
      <button
        onClick={() => handleNavigate("/calendar")}
        className="flex justify-center items-center rounded-lg p-4 h-20 w-20 cursor-pointer hover:scale-105"
      >
        <IoCalendarOutline
          className={`${path === "/calendar" ? "text-cyan-700" : ""} text-3xl`}
        />
      </button>
    </div>
  );
};

export default BottomNavBar;
