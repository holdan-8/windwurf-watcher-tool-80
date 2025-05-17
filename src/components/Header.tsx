
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">WINDWURF</h1>
        </div>
        <p className="text-sm mt-2 sm:mt-0 text-green-100">
          Schnelle Erkennung von Sturmschäden im Wald mit Satellitenbildern
        </p>
      </div>
    </header>
  );
};

export default Header;
