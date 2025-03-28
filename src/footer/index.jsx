import { FaRegCopyright } from "react-icons/fa6";
import { BsTwitterX, BsLinkedin, BsGithub } from "react-icons/bs";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 mt-12 transition-colors duration-200">
      <div className="mx-auto px-4 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Engineer Babu</h3>
        <p className="text-base italic mb-6 max-w-2xl mx-auto">
          Always be ready to face the challenges of life. Trying to Become a
          better version of my yesterday self.
        </p>

        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="https://www.linkedin.com/in/dev-ujjwal/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center social-icon"
            aria-label="LinkedIn"
          >
            <BsLinkedin className="text-xl" />
          </a>
          <a
            href="https://github.com/MrGroot97"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center social-icon"
            aria-label="GitHub"
          >
            <BsGithub className="text-xl" />
          </a>
          <a
            href="https://x.com/Oye_ujju"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center social-icon"
            aria-label="Twitter/X"
          >
            <BsTwitterX className="text-lg" />
          </a>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 mt-2">
          <div className="flex justify-center items-center text-sm">
            <span className="flex items-center">
              Copyright <FaRegCopyright className="mx-1" />
            </span>
            <strong className="mx-1">Engineer Babu</strong>
            <span>{currentYear} - All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
