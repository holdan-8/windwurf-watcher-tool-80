import { SatellitePass } from "@/lib/types";
import Papa from "papaparse";

// Function to parse CSV data
const parseCSV = (csvData: string): SatellitePass[] => {
  const result = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => {
      switch (header) {
        case "Acquisition Date":
          return "acquisitionDate";
        case "Publish Date":
          return "publishDate";
        case "Orbit":
          return "orbit";
        case "Platform":
          return "platform";
        default:
          return header;
      }
    },
  });

  return result.data as SatellitePass[];
};

// Function to fetch satellite passes for the next 7 days
export const fetchSatellitePasses = async (): Promise<SatellitePass[]> => {
  try {
    const response = await fetch(
      "https://cms.geo.admin.ch/Topo/umweltbeobachtung/tools/acquisitionplan.csv"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvData = await response.text();

    return parseCSV(csvData);

    // return mockData;
  } catch (error) {
    console.error("Error fetching satellite data:", error);
    throw error;
  }
};
