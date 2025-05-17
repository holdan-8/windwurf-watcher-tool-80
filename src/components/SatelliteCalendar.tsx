
import React from "react";
import { format, addDays } from "date-fns";
import { SatellitePass } from "@/lib/types";

interface SatelliteCalendarProps {
  passes: SatellitePass[];
}

const SatelliteCalendar: React.FC<SatelliteCalendarProps> = ({ passes }) => {
  const today = new Date();
  const nextSevenDays = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const getPassesForDate = (date: Date): SatellitePass[] => {
    return passes.filter(
      (pass) =>
        format(new Date(pass.acquisitionDate), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {nextSevenDays.map((date, index) => {
        const dayPasses = getPassesForDate(date);
        return (
          <div
            key={index}
            className={`border rounded-md p-2 text-center ${
              dayPasses.length > 0
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="text-xs font-medium">{format(date, "EEE")}</div>
            <div className="font-bold">{format(date, "dd")}</div>
            <div className="mt-2 flex flex-col items-center space-y-1">
              {dayPasses.map((pass, passIndex) => (
                <div key={passIndex} className="flex flex-col items-center">
                  <img
                    src={`https://cms.geo.admin.ch/Topo/umweltbeobachtung/swisseo/assets/${pass.orbit}.png`}
                    alt={`Orbit ${pass.orbit}`}
                    className="w-6 h-6"
                  />
                  <span className="text-xs">{pass.platform}</span>
                </div>
              ))}
              {dayPasses.length === 0 && (
                <div className="text-gray-400 text-xs">Kein Überflug</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SatelliteCalendar;
