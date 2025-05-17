
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} WINDWURF Projekt
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://hack.data-hackdays-be.ch/project/60"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-200 hover:text-white"
            >
              Data Hackdays Challenge
            </a>
            <a
              href="https://holdan-8.github.io/Windwurf/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-200 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
