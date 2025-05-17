
import React from "react";

const EarthEngineViewer: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <iframe
          src="https://geetest-386915.projects.earthengine.app/view/be25windwurf"
          title="Windwurf GEE Application"
          className="w-full h-full min-h-[70vh] border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mt-2 flex items-center">
        <div className="w-6 h-6 bg-[#fce903] mr-2"></div>
        <span>Potentielle Sturmschäden / Dommages potentiels causés par la tempête</span>
      </div>
    </div>
  );
};

export default EarthEngineViewer;
