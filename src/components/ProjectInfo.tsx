
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectInfo: React.FC = () => {
  const [language, setLanguage] = useState<"de" | "fr">("de");
  
  return (
    <Card>
      <CardHeader className="bg-green-50">
        <div className="flex justify-between items-center">
          <CardTitle>WINDWURF</CardTitle>
          <Tabs value={language} onValueChange={(val) => setLanguage(val as "de" | "fr")}>
            <TabsList>
              <TabsTrigger value="de">DE</TabsTrigger>
              <TabsTrigger value="fr">FR</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {language === "de" ? (
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold">Anleitung:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Wählen Sie links im Viewer das Datum des Sturmereignisses aus.</li>
              <li>Die Karte wird aktualisiert und zeigt in Gelb die Flächen, die potentiell von Sturmschäden betroffen sind.</li>
              <li>Zoomen und verschieben Sie die Karte, um bestimmte Gebiete genauer zu betrachten.</li>
            </ol>
            
            <p>
              Das WINDWURF-Projekt bietet eine Lösung zur schnellen Erkennung von 
              Sturmschäden in Wäldern mithilfe von Sentinel-2 Satellitenbildern.
            </p>
            
            <p>
              Nach einem Sturmereignis ist es für das Amt für Wald und 
              Naturgefahren (AWN) entscheidend, schnell einen Überblick über die 
              räumliche Verteilung und das Ausmaß der entstandenen Schäden zu erhalten.
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
                onClick={() => window.open("https://github.com/holdan-8/windwurf-watcher-tool-80/", "_blank")}
              >
                GitHub Repository
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold">Instructions:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Sélectionnez la date de l'événement tempête dans le visualiseur à gauche.</li>
              <li>La carte sera mise à jour et montrera en jaune les zones potentiellement touchées par les dommages de tempête.</li>
              <li>Effectuez un zoom et déplacez la carte pour examiner certaines zones plus en détail.</li>
            </ol>
            
            <p>
              Le projet WINDWURF offre une solution pour la détection rapide des 
              dommages causés par les tempêtes dans les forêts à l'aide d'images 
              satellites Sentinel-2.
            </p>
            
            <p>
              Après un événement de tempête, il est crucial pour l'Office des forêts 
              et des dangers naturels (AWN) d'obtenir rapidement un aperçu de la 
              distribution spatiale et de l'ampleur des dommages causés.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button 
                variant="outline" 
                className="bg-green-50 hover:bg-green-100"
                onClick={() => window.open("https://hack.data-hackdays-be.ch/project/60", "_blank")}
              >
                Voir le défi
              </Button>
              <Button 
                variant="outline"
                className="bg-green-50 hover:bg-green-100"
                onClick={() => window.open("https://holdan-8.github.io/Windwurf/", "_blank")}
              >
                Repository GitHub
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectInfo;
