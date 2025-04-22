import { FaCode, FaRocket, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function About() {
  return (
    <>
      <NavBar />
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center px-6 py-12">
        {/* Header Section */}
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-500">
          About ByteForge
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl text-center mt-4">
          ByteForge is a next-generation coding platform that combines a
          **multi-code IDE** with **structured programming tutorials**. Learn,
          code, and innovate—all in one place!
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
            <FaCode className="text-blue-400 text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Multi-Code IDE</h3>
            <p className="text-gray-400 mt-2">
              Write, run, and save code in multiple languages with an
              interactive coding experience.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
            <FaRocket className="text-green-400 text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Structured Tutorials</h3>
            <p className="text-gray-400 mt-2">
              Learn programming with **course-based** tutorials, just like
              W3Schools & GFG.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-700">
            <FaLightbulb className="text-yellow-400 text-5xl mb-4" />
            <h3 className="text-xl font-semibold">AI-Powered Learning</h3>
            <p className="text-gray-400 mt-2">
              Get AI assistance to **debug code, suggest improvements, and learn
              faster**.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-16 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-blue-400">Our Mission</h2>
          <p className="text-gray-400 mt-4 text-lg">
            We aim to make **coding accessible** to everyone by providing an
            intuitive learning environment where beginners and experts can
            **code, learn, and grow** together.
          </p>
        </div>

        {/* CTA (Call-To-Action) */}
        <div className="mt-12">
          <Link
            to="/"
            className="relative mt-4 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Start Coding Now 🚀
            </span>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
