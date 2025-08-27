import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { BsPinMapFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { BiSolidLayerPlus } from "react-icons/bi";
import { IoIosReturnLeft } from "react-icons/io";
import { IoMdSunny, IoIosMoon } from "react-icons/io";
import logo from "../assets/react.svg";

const UserManage = ({
  user,
  logout,
  onLayerList,
  userListModal,
  onToggleDarkMode,
  darkMode,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleUserBtn = () => {
    setShowDropdown((prev) => !prev);
  };

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const manageListModal = () => {
    setShowDropdown(false);
    userListModal();
  };

  const changeDarkMode = () => {
    setShowDropdown(false);
    onToggleDarkMode();
  }

  return (
    <div
      className="relative flex items-center bg-transparent p-2 rounded-full transition-all z-50"
      ref={dropdownRef}
    >
      <div className="flex items-center gap-3 p-4">
        <button
          onClick={handleUserBtn}
          className="rounded-full hover:cursor-pointer"
        >
          <img
            src={user?.picture || logo}
            alt={user?.name || "Usuario"}
            className="rounded-full"
          />
        </button>
        <div className="flex flex-col">
          <p className="text-sm">Hola!</p>
          <p className="text-lg font-bold">
            {user?.name || "Invitado"}
          </p>{" "}
        </div>
      </div>

      {showDropdown && (
        <div className="absolute left-0 top-full w-48 bg-white dark:text-white dark:bg-gray-900 shadow-xl border border-gray-300 rounded-b-md z-10 text-sm">
          <div className="flex flex-col justify-center items-center p-4 border-b border-gray-200">
            <p className="text-lg">{`Hola, ${
              user?.name || "Usuario"
            }`}</p>
            <p className="text-gray-500 dark:text-white text-xs">{user?.email || ""}</p>
          </div>
          {
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer dark:text-white "
              onClick={manageListModal}
            >
              <div className="flex justify-center items-center">
                <FaUsers style={{ margin: "5px", fontSize: "20px" }} />
                <span className="">Gestión de usuarios</span>
              </div>
            </button>
          }
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 dark:text-white  cursor-pointer"
            onClick={changeDarkMode}
          >
            <div className="">
              {darkMode ? (
                <span className="flex justify-center items-center"><IoMdSunny style={{ margin: "5px", fontSize: "20px" }} />Modo claro</span>
              ) : (
                <span className="flex justify-center items-center"><IoIosMoon style={{ margin: "5px", fontSize: "20px" }} />Modo oscuro</span>
              )}
            </div>
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
            onClick={logout}
          >
            <div className="flex justify-center items-center">
              <RiLogoutBoxLine style={{ margin: "5px", fontSize: "20px" }} />
              <span className="">Cerrar sesión</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManage;
