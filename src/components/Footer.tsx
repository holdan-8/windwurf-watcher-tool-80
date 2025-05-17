
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
