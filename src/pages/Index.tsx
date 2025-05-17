import { useEffect, useState } from "react";
import Header from "@/components/Header";
import EarthEngineViewer from "@/components/EarthEngineViewer";
import SatelliteCalendar from "@/components/SatelliteCalendar";
import ProjectInfo from "@/components/ProjectInfo";
import Footer from "@/components/Footer";
import { fetchSatellitePasses } from "@/services/satelliteService";
import { SatellitePass } from "@/lib/types";

const Index = () => {
  const [satellitePasses, setSatellitePasses] = useState<SatellitePass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSatelliteData = async () => {
      try {
        const passes = await fetchSatellitePasses();
        setSatellitePasses(passes);
      } catch (error) {
        console.error("Error loading satellite data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSatelliteData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image with opacity */}
      <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
      style={{
        backgroundImage: "url('src/assets/wald.jpg')",
        opacity: 0.3, // Adjust this value to dim more or less
        zIndex: 0,
      }}
      aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <EarthEngineViewer />
          </div>
        </div>
        
        <div className="space-y-8">
          <div>
            {loading ? (
            <div className="h-48 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
            </div>
            ) : (
            <SatelliteCalendar passes={satellitePasses} />
            )}
          </div>
       
          
          <div>
          <div className="bg-white rounded-lg shadow-md">
            <ProjectInfo />
          </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
      </div>
    </div>
  );
};

export default Index;
