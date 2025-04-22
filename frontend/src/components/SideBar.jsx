import { Link } from "react-router-dom";
import logo from "../images/logo/logo3.png";
import { useState, useEffect } from "react";
import {
  AiOutlineRobot,
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineMail,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { api_base_url } from "../helper";
import Tutorials from "./Tutorials";
import { VscTerminal } from "react-icons/vsc";
const Sidebar = ({ isOpen, toggleMenu }) => {
  const [tutorials, setTutorials] = useState([]); // Store tutorials from API
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState({}); // Track expanded tutorial topics
  // Close sidebar on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        toggleMenu(false); // Close sidebar on desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggleMenu]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await fetch(`${api_base_url}/api/tutorials/all`);
        if (!res.ok) {
          throw new Error("Failed to fetch tutorials");
        }
        const data = await res.json();
        console.log("API Response:", data); // Debugging
        setTutorials(data.tutorial ?? []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };
    fetchTutorials();
  }, []);

  const toggleTopic = (tutorialId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [tutorialId]: !prev[tutorialId],
    }));
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 left-0 h-full w-[260px] bg-[#1a1a1a] shadow-lg z-50 transform transition-transform duration-300
    ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900`}
      >
        <img
          className="w-[150px] mx-auto my-6 object-cover"
          src={logo}
          alt="Logo"
        />
        {/* <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="btn mx-16 flex items-center gap-2 m-4 bg-red-500 text-white py-2 px-4 rounded-lg transition-all hover:bg-red-600"
        >
          <FiLogOut size={20} />
          Logout
        </button> */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="flex m-4 mx-16 items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 
             bg-red-500 text-white font-semibold tracking-wide shadow-md 
             hover:bg-red-600 hover:shadow-lg hover:scale-105"
        >
          {/* Logout Icon with Hover Effect */}
          <FiLogOut
            className="w-6 h-6 text-white transition-transform 
               group-hover:scale-110 duration-300"
          />

          {/* Logout Text with Gradient Effect */}
          <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Logout
          </span>
        </button>

        <ul className="flex flex-col gap-2 text-left px-4">
          {/* Home */}
          <li>
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
               hover:bg-blue-500/10 hover:text-blue-500 group"
              to="/"
              onClick={toggleMenu}
            >
              {/* IDE Icon with Hover Effect */}
              <AiOutlineHome
                className="w-6 h-6 text-blue-500 transition-transform 
                 group-hover:scale-110 group-hover:text-red-500 duration-300"
              />

              {/* IDE Name with Gradient Effect */}
              <span
                className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text 
                 text-transparent font-semibold text-lg tracking-wide"
              >
                Home
              </span>
            </Link>
          </li>

          {/* IDE */}
          <li>
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
               hover:bg-blue-500/10 hover:text-blue-500 group"
              to="/ide"
              onClick={toggleMenu}
            >
              {/* IDE Icon with Hover Effect */}
              <VscTerminal
                className="w-6 h-6 text-blue-500 transition-transform 
                 group-hover:scale-110 group-hover:text-red-500 duration-300"
              />

              {/* IDE Name with Gradient Effect */}
              <span
                className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text 
                 text-transparent font-semibold text-lg tracking-wide"
              >
                IDE
              </span>
            </Link>
          </li>

          {/* About */}
          <li>
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
               hover:bg-blue-500/10 hover:text-blue-500 group"
              to="/about"
              onClick={toggleMenu}
            >
              {/* About Icon with Hover Effect */}
              <AiOutlineInfoCircle
                className="w-6 h-6 text-blue-500 transition-transform 
                 group-hover:scale-110 group-hover:text-red-500 duration-300"
              />

              {/* About Text with Gradient Effect */}
              <span
                className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text 
                 text-transparent font-semibold text-lg tracking-wide"
              >
                About
              </span>
            </Link>
          </li>

          {/*Tutorials List*/}
          {/* <Tutorials
            setIsDropdownOpen={setIsDropdownOpen}
            isDropdownOpen={isDropdownOpen}
            tutorials={tutorials}
            toggleTopic={toggleTopic}
            expandedTopics={expandedTopics}
            toggleMenu={toggleMenu}
          /> */}
          <div className="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            <Tutorials
              setIsDropdownOpen={setIsDropdownOpen}
              isDropdownOpen={isDropdownOpen}
              tutorials={tutorials}
              toggleTopic={toggleTopic}
              expandedTopics={expandedTopics}
              toggleMenu={toggleMenu}
            />
          </div>

          {/* AI */}
          <li>
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
               hover:bg-blue-500/10 hover:text-blue-500 group"
              to="/ai"
              onClick={toggleMenu}
            >
              {/* AI Icon with Hover Effect */}
              <AiOutlineRobot
                className="w-6 h-6 text-blue-500 transition-transform 
                               group-hover:scale-110 group-hover:text-red-500 duration-300"
              />

              {/* ForgeCopilot Name with Gradient Effect */}
              <span
                className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text 
                     text-transparent font-semibold text-lg tracking-wide"
              >
                ForgeCopilot
              </span>

              {/* Stylish AI Badge */}
              <span
                className="ml-auto bg-blue-600/20 text-blue-500 text-[10px] font-bold 
                     px-2 py-1 rounded-lg border border-blue-500 shadow-sm 
                     group-hover:bg-blue-600/40 group-hover:text-white transition-all"
              >
                AI
              </span>
            </Link>
          </li>

          {/* Contact */}

          <li>
            <Link
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
               hover:bg-blue-500/10 hover:text-blue-500 group"
              to="/contact"
              onClick={toggleMenu}
            >
              {/* Contact Icon with Hover Effect */}
              <AiOutlineMail
                className="w-6 h-6 text-blue-500 transition-transform 
                 group-hover:scale-110 group-hover:text-red-500 duration-300"
              />

              {/* Contact Text with Gradient Effect */}
              <span
                className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text 
                 text-transparent font-semibold text-lg tracking-wide"
              >
                Contact
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300
          ${isOpen ? "block" : "hidden"} md:hidden`}
        onClick={toggleMenu}
      ></div>

      {/* Overlay for All Screen Sizes */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-40 transition-opacity duration-300
    ${isOpen ? "block" : "hidden"}`}
        onClick={toggleMenu}
      ></div>
    </>
  );
};

export default Sidebar;
