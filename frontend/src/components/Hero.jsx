// import logo from "../images/logo/logo3.png";
// import { useEffect, useState } from "react";

// const Hero = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <section className="flex flex-col items-center justify-center h-screen text-white bg-gray-900 p-8 text-center">
//       {/* Big Logo with Default Bounce Animation */}
//       <img
//         src={logo}
//         alt="ByteForge Logo"
//         className={`w-40 md:w-60 lg:w-80 mb-6 transform transition-all duration-1000 ${
//           isVisible
//             ? "opacity-100 scale-100 animate-bounce"
//             : "opacity-0 scale-90"
//         }`}
//       />

//       {/* Heading with Fade-in Effect */}
//       <h1
//         className={`text-3xl md:text-5xl font-bold mb-4 transition-opacity duration-1000 ${
//           isVisible ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         Code. Learn. Innovate.
//       </h1>

//       {/* Subheading with Slide-in Effect */}
//       <p
//         className={`text-lg md:text-xl text-gray-400 mb-6 max-w-2xl transition-all duration-1000 delay-200 ${
//           isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
//         }`}
//       >
//         Master programming with structured tutorials and a multi-code IDE.
//         Everything you need to learn, practice, and build projects—all in one
//         place.
//       </p>

//       {/* CTA Button with Pulse Effect */}
//       <div
//         className={`transition-all duration-1000 delay-400 ${
//           isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
//         }`}
//       >
//         <a href="/signUp">
//           <button className="relative  inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
//             <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
//               Sign Up
//             </span>
//           </button>
//         </a>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import logo from "../images/logo/logo3.png";
import { useEffect, useState } from "react";
import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiC,
  SiGnubash,
} from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import { FaJava } from "react-icons/fa";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen text-white bg-gray-900 p-8 text-center">
      {/* Big Logo with Default Bounce Animation */}
      <img
        src={logo}
        alt="ByteForge Logo"
        className={`w-40 md:w-60 lg:w-80 mb-6 transform transition-all duration-1000 ${
          isVisible
            ? "opacity-100 scale-100 animate-bounce"
            : "opacity-0 scale-90"
        }`}
      />

      {/* Heading with Fade-in Effect */}
      <h1
        className={`text-3xl flex md:text-5xl font-bold mb-4 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Code. Learn. Innovate.
        <GiArtificialIntelligence className="text-purple-400 hover:scale-110 transition-transform" />
      </h1>

      {/* Subheading with Slide-in Effect */}
      <p
        className={`text-lg md:text-xl text-gray-400 mb-6 max-w-2xl transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        Master programming with structured tutorials and a multi-code IDE. Learn
        ,<span className="text-purple-400 font-semibold"> AI</span>-powered
        assistance, and practice
        <span className="text-blue-400 font-semibold"> Python</span>,
        <span className="text-red-400 font-semibold"> Java</span>,
        <span className="text-yellow-400 font-semibold"> JavaScript</span>,
        <span className="text-blue-500 font-semibold"> C++</span>,
        <span className="text-blue-700 font-semibold"> C</span>, and
        <span className="text-green-400 font-semibold"> Bash</span>!
      </p>

      {/* Language Icons */}
      <div
        className="flex py-6 space-x-6 text-4xl mb-6 opacity-0 translate-y-5 transition-all duration-1000 delay-300"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <SiPython className="text-yellow-400 hover:scale-110 transition-transform" />
        <FaJava className="text-red-500 hover:scale-110 transition-transform" />
        <SiJavascript className="text-yellow-300 hover:scale-110 transition-transform" />
        <SiCplusplus className="text-blue-500 hover:scale-110 transition-transform" />
        <SiC className="text-blue-700 hover:scale-110 transition-transform" />
        <SiGnubash className="text-green-400 hover:scale-110 transition-transform" />
      </div>

      {/* CTA Button */}
      <div
        className={`transition-all duration-1000 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <a href="/signUp">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Sign Up
            </span>
          </button>
        </a>
      </div>
    </section>
  );
};

export default Hero;
