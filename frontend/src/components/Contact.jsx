import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-8 text-gray-400">
        Have questions? Reach out to us!
      </p>

      {/* Contact Info */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FaEnvelope className="text-yellow-400 text-2xl" />
          <span>contact@byteforge.com</span>
        </div>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FaPhone className="text-green-400 text-2xl" />
          <span>+123 456 7890</span>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <FaMapMarkerAlt className="text-red-400 text-2xl" />
          <span>123 Tech Street, Code City</span>
        </div>
      </div>

      {/* Contact Form */}
      <form className="mt-8 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white mb-4 focus:outline-none"
          placeholder="Your Name"
        />

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded bg-gray-700 text-white mb-4 focus:outline-none"
          placeholder="Your Email"
        />

        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          className="w-full p-2 rounded bg-gray-700 text-white mb-4 focus:outline-none"
          placeholder="Your Message"
        ></textarea>

        <button className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white font-semibold">
          Send Message
        </button>
      </form>

      {/* Social Links */}
      <div className="flex space-x-6 mt-6">
        <a href="#" className="text-blue-400 text-2xl hover:text-blue-500">
          <FaFacebook />
        </a>
        <a href="#" className="text-blue-300 text-2xl hover:text-blue-400">
          <FaTwitter />
        </a>
        <a href="#" className="text-blue-500 text-2xl hover:text-blue-600">
          <FaLinkedin />
        </a>
        <a href="#" className="text-gray-400 text-2xl hover:text-gray-500">
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default Contact;
