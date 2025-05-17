
import React from "react";

const EarthEngineViewer: React.FC = () => {
  return (
    <div className="aspect-[16/9] w-full">
      <iframe
        src="https://geetest-386915.projects.earthengine.app/view/be25windwurf"
        title="Windwurf GEE Application"
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default EarthEngineViewer;
