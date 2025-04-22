import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import logo from "../images/logo/logo3.png";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const NoPage = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 text-center">
        {/* Logo */}
        <img
          src={logo} // Replace with your actual logo path
          alt="ByteForge Logo"
          className="w-32 sm:w-40 my-5 object-cover"
        />

        {/* 404 Icon & Message */}
        <FaExclamationTriangle className="text-red-500 text-6xl sm:text-7xl mb-4 animate-pulse" />
        <h1 className="text-3xl sm:text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-gray-400 mt-2 text-base sm:text-lg max-w-xs sm:max-w-md">
          Oops! Looks like {"you've"} ventured into the void.
        </p>
        <p className="text-gray-500 text-sm sm:text-base">
          {"Let's"} get you back to safety.
        </p>

        {/* Home Button */}
        <Link
          to="/"
          className="relative mt-4 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Home
          </span>
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default NoPage;
