import React, { useEffect, useState } from "react";
import UserManager from "./UserManager";
import Search from "./Search";
import { GrUserManager } from "react-icons/gr";

const NavBar = ({ user, onLogout, onSearch, onToggleDarkMode, darkMode }) => {
  const [userLog, setUserLog] = useState(null);

  useEffect(() => {
    setUserLog(user);
  }, [user]); // <-- actualiza cuando user cambia

  return (
    <div className="fixed top-0 h-28 z-10 rounded-b-3xl flex border-b border-gray-300 w-full max-w-full items-center bg-white dark:bg-gray-900">
      <div className="flex-1">
        <UserManager user={userLog} logout={onLogout} onToggleDarkMode={onToggleDarkMode} darkMode={darkMode}/>
      </div>
      <div className="flex-1 max-w-2/4">
        <Search onSearch={onSearch}/>
      </div>
    </div>
  );
};

export default NavBar;
