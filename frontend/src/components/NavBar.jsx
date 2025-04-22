import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Sidebar from "./SideBar";
import logo from "../images/logo/logo3.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#0f0e0e] text-white">
      <div className="flex items-center justify-between px-3 h-[90px] bg-[#0f0e0e] shadow-md">
        <img className="w-[140px] my-5 object-cover" src={logo} alt="Logo" />

        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="text-2xl">
          {isOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>
      {/* Sidebar Component */}
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
    </nav>
  );
};

export default NavBar;
