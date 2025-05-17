🌲 WINDWURF – Storm Damage Detection in Swiss Forests

WINDWURF is an interactive tool to rapidly assess storm damage in Swiss forests using openly available Sentinel-2 satellite imagery provided via the swisstopo [swissEO S2-SR](https://www.swisstopo.admin.ch/de/satellitenbilder-swisseo-s2-sr) Product. Developed during [Data Hackdays Bern 2025](https://hack.data-hackdays-be.ch/project/60), this project helps the Amt für Wald und Naturgefahren (AWN) get timely insight into storm-related forest disturbances over 180,000 hectares of woodland — an area too vast for field inspection alone.
🚀 What It Does

After a storm event, WINDWURF allows users to[

    Select a date of a storm event

    Automatically get potential forest damage by compare satellite imagery before and after the event

    Highlight forest areas with significant vegetation loss (potential storm damage)

The result: a fast, data-driven overview of potentially affected forest regions.

🛰️ How It Works

WINDWURF is powered by Google Earth Engine (GEE) and utilizes Sentinel-2 imagery provided by [swissEO S2-SR](https://www.swisstopo.admin.ch/de/satellitenbilder-swisseo-s2-sr) processed with a pixel-wise dNBR (delta Normalized Burn Ratio) analysis.
Core Analysis Steps:

    NBR Calculation:

        NBR = (B8A - B11) / (B8A + B11)

        Computed for pre- and post-storm periods

    dNBR Calculation:

        dNBR = NBR_post - NBR_pre

        Significant vegetation loss → low dNBR values (≤ -0.15)

    Filtering & Masking:

        [Swiss-harmonized Sentinel-2 data](https://www.swisstopo.admin.ch/de/satellitenbilder-swisseo-s2-sr)

        Forest-only mask (Swiss BAFU ecosystem data)[https://www.wsl.ch/de/projekte/lebensraumkarte-schweiz-1/]

        Custom 10m cloud (CloudScorePlus) and terrain (swissSURFACE3D) and shadow masks

        Snow masking using NDSI

Outputs:

    ✅ Median NBR before and after the event

    ✅ dNBR layer showing vegetation change

    ✅ Disturbance mask (dNBR ≤ -0.15) highlighting severe impact zones

🧰 Tech Stack

    🌐 Google Earth Engine (data analysis & visualization)

    🛰️ Sentinel-2 imagery (via [swissEO S2-SR](https://www.swisstopo.admin.ch/de/satellitenbilder-swisseo-s2-sr))

    🧠 Forest & snow masking (Swiss federal data)

    ⚛️ React frontend (using Lovable)

📦 App Usage

Visit the App and follow these steps:

    Wählen Sie das Datum des Sturmereignisses .

    Die Karte wird automatisch aktualisiert. Gelbe Flächen zeigen potentielle Sturmschäden.

    Zoomen und verschieben Sie die Karte für eine genauere Ansicht.

📊 Legend
Color Meaning
🟡 Potential forest damage (dNBR ≤ -0.15)
📅 Notes

    60-day comparison window post-storm

    Compared to same window from previous year

    Only forests are analyzed

    Disturbance areas appear in yellow on delta map

📁 File Structure (Important Components)

    gee/ — GEE script with NBR logic, cloud/snow masking, UI

    frontend/ — React app using Lovable setup

    assets/ — Swiss data layers (forest mask, boundaries)

👥 Team & Acknowledgments

Developed at Data Hackdays Bern with support from:

    Swisstopo – Harmonized Sentinel-2 data - [Tschoun GitHub Profile](https://github.com/Tschoun),[davidoesch GitHub Profile](https://github.com/davidoesch)

    Amt für Wald und Naturgefahren (AWN) – Challenge owner [nnja GitHub Profile](https://github.com/nnja), Dani Steinberger

    Swiss Federal Office for the Environment (BAFU) -expert guidance [Rdataflow GitHub Profile](https://github.com/Rdataflow), Yannick Barton
    
    Eidg. Forschungsanstalt WSL and swisstopo – expert guidance and SAR Wrestling Marius Rüetschi

    BFH Institut Public Sector Transformation - FullStack! (holdan-8 GitHub Profile](https://github.com/holdan-8)

🪵 Why WINDWURF?

With storms intensifying over the last 50 years, detecting forest damage efficiently is critical for mitigation, logging decisions, and ecological monitoring. WINDWURF empowers authorities with a scalable, transparent, and reproducible approach to disaster response.
