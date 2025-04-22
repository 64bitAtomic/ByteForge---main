import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-6 px-4">
      <div className="container mx-auto flex flex-col items-center">
        {/* Icons Section */}
        <div className="flex gap-6 mb-4">
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-pink-500 transition-all"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/yourwhatsapplink"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-green-500 transition-all"
          >
            <FaWhatsapp />
          </a>
          <a
            href="mailto:your@email.com"
            className="text-2xl text-gray-400 hover:text-blue-400 transition-all"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/yourgithub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-gray-300 transition-all"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourlinkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-blue-500 transition-all"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-cyan-400 transition-all"
          >
            <FaGlobe />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} ByteForge. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
