
import { SatellitePass } from "@/lib/types";
import Papa from "papaparse";

// Function to parse CSV data
const parseCSV = (csvData: string): SatellitePass[] => {
  const result = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });
  
  return result.data as SatellitePass[];
};

// Function to fetch satellite passes for the next 7 days
export const fetchSatellitePasses = async (): Promise<SatellitePass[]> => {
  try {
    // This is a proxy implementation since we can't fetch directly from the CSV due to CORS
    // In a real implementation, you would set up a proxy server or use a CORS proxy
    
    // Simulate data for the demo (next 7 days with sample data)
    // const today = new Date();
    // const mockData: SatellitePass[] = [
    //   {
    //     acquisitionDate: new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0],
    //     publishDate: new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0],
    //     orbit: "65",
    //     platform: "S2C"
    //   },
    //   {
    //     acquisitionDate: new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0],
    //     publishDate: new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0],
    //     orbit: "22",
    //     platform: "S2A"
    //   },
    //   {
    //     acquisitionDate: new Date(today.setDate(today.getDate() + 4)).toISOString().split('T')[0],
    //     publishDate: new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0],
    //     orbit: "37",
    //     platform: "S2B"
    //   }
    // ];

    // In a production environment, you would use:
    const response = await fetch("https://cms.geo.admin.ch/Topo/umweltbeobachtung/tools/acquisitionplan.csv");
    const csvData = await response.text();
    return parseCSV(csvData);
    
    // return mockData;
  } catch (error) {
    console.error("Error fetching satellite data:", error);
    throw error;
  }
};
