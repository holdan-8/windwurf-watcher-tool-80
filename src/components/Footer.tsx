import React, { useState } from "react";

const Footer: React.FC = () => {
  const [showImpressum, setShowImpressum] = useState(false);

  return (
    <footer className="bg-green-800 text-white py-6 mt-8 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} WINDWURF Projekt
          </p>
          <button
            className="text-sm underline hover:text-gray-300"
            onClick={() => setShowImpressum(true)}
          >
            Impressum
          </button>
        </div>
      </div>

      {/* Impressum Modal */}
{showImpressum && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-xl w-full overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-bold mb-4">Impressum</h2>
      <p className="text-sm mb-2">
        Dieses Projekt wurde im Rahmen der Data Hackdays Bern 2025 entwickelt.
      </p>

      <p className="text-sm mb-2">
        Verantwortlich für den Inhalt: <br />
        WINDWURF Team <br />
        Kontakt: <a href="mailto:daniel.steinberger@be.ch" className="underline text-blue-600">daniel.steinberger@be.ch</a>
      </p>

      <p className="text-sm font-semibold mt-4">Unterstützung & Beiträge:</p>
      <ul className="list-disc list-inside text-sm space-y-1 mt-1">
        <li>
          <strong>Swisstopo</strong> – Harmonized Sentinel-2 data –{" "}
          <a href="https://github.com/Tschoun" className="text-blue-600 underline" target="_blank">Tschoun</a>,{" "}
          <a href="https://github.com/davidoesch" className="text-blue-600 underline" target="_blank">davidoesch</a>
        </li>
        <li>
          <strong>Amt für Wald und Naturgefahren (AWN)</strong> – Challenge owner –{" "}
          <a href="https://github.com/nnja" className="text-blue-600 underline" target="_blank">nnja</a>, Dani Steinberger
        </li>
        <li>
          <strong>Swiss Federal Office for the Environment (BAFU)</strong> – Expert guidance –{" "}
          <a href="https://github.com/Rdataflow" className="text-blue-600 underline" target="_blank">Rdataflow</a>, Yannick Barton
        </li>
        <li>
          <strong>WSL & swisstopo</strong> – Expert guidance and SAR Wrestling – Marius Rüetschi
        </li>
        <li>
          <strong>BFH Institut Public Sector Transformation</strong> – FullStack –{" "}
          <a href="https://github.com/holdan-8" className="text-blue-600 underline" target="_blank">holdan-8</a>
        </li>
      </ul>

      <div className="text-right mt-4">
        <button
          className="text-green-800 hover:underline"
          onClick={() => setShowImpressum(false)}
        >
          Schließen
        </button>
      </div>
    </div>
  </div>
)}

    </footer>
  );
};

export default Footer;
