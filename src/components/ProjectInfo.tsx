
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProjectInfo: React.FC = () => {
  return (
    <Card>
      <CardHeader className="bg-green-50">
        <CardTitle>WINDWURF</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4 text-sm">
          <p>
            Das WINDWURF-Projekt bietet eine Lösung zur schnellen Erkennung von
            Sturmschäden in Wäldern mithilfe von Sentinel-2 Satellitenbildern.
          </p>
          
          <p>
            Nach einem Sturmereignis ist es für das Amt für Wald und
            Naturgefahren (AWN) entscheidend, schnell einen Überblick über die
            räumliche Verteilung und das Ausmaß der entstandenen Schäden zu
            erhalten.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button 
              variant="outline" 
              className="bg-green-50 hover:bg-green-100"
              onClick={() => window.open("https://hack.data-hackdays-be.ch/project/60", "_blank")}
            >
              Challenge ansehen
            </Button>
            <Button 
              variant="outline"
              className="bg-green-50 hover:bg-green-100"
              onClick={() => window.open("https://holdan-8.github.io/Windwurf/", "_blank")}
            >
              GitHub Repository
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectInfo;
