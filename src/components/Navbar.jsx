import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleSidebar, toggleTheme } from "../features/auth/authSlice";
import { MdOutlineMenu } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);
  return (
    <nav
      className={`flex justify-between items-center py-4 px-8 shadow-sm z-[1000] ${
        theme === "dark" ? "bg-dark text-white" : "bg-light text-black"
      }`}
    >
      <div className="sidebar flex items-center gap-4">
        <p onClick={() => dispatch(toggleSidebar())}>
          <MdOutlineMenu className="text-2xl cursor-pointer" />
        </p>
        <img src="./logo.svg" alt="" />
      </div>
      <div className="sidebar flex items-center gap-4">
        <button onClick={() => dispatch(logout())}>Logout</button>
        <IoSearch className="text-2xl cursor-pointer" />
        <LuLayoutGrid className="text-2xl cursor-pointer" />
        {theme === "light" ? (
          <p className="cursor-pointer" onClick={() => dispatch(toggleTheme())}>
            <img src="./dark.svg" alt="" />
          </p>
        ) : (
          <p className="cursor-pointer" onClick={() => dispatch(toggleTheme())}>
            <img src="./light.svg" alt="" />
          </p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
