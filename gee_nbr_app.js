// NBR Disturbance Detector App
// This app allows users to select a reference date to detect forest disturbances
// by comparing NBR values before and after the selected date

// Initialize the map
ui.root.clear();
var mapPanel = ui.Map();
mapPanel.setCenter(7.395567, 47.046158, 16);
mapPanel.setOptions('HYBRID');



// Create a control panel to place on the map
var controlPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '240px',
    padding: '10px',
    position: 'top-left',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px'
  }
});

// Add title
var title = ui.Label({
  //value: 'Forest Disturbance Detector',
  value: '',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 10px 0'
  }
});
controlPanel.add(title);

// // Add description
// var description = ui.Label({
//   value: 'Detect forest disturbances using Normalized Burn Ratio (NBR).',
//   style: {margin: '0 0 15px 0'}
// });
// controlPanel.add(description);

// Create date input with validation
var dateLabel = ui.Label('Datum Ereignis (YYYY-MM-DD):', 
  {margin: '0 0 5px 0', fontWeight: 'bold'});
controlPanel.add(dateLabel);

var dateInput = ui.Textbox({
  placeholder: 'YYYY-MM-DD',
  value: '2021-06-21',
  style: {margin: '0 0 15px 0'}
});
controlPanel.add(dateInput);

// // Create duration input
// var durationLabel = ui.Label('Analysis Period (days):', 
//   {margin: '0 0 5px 0', fontWeight: 'bold'});
// controlPanel.add(durationLabel);

// var durationInput = ui.Textbox({
//   placeholder: 'Number of days',
//   value: '60',
//   style: {margin: '0 0 15px 0'}
// });
// controlPanel.add(durationInput);

// Create a button to run the analysis
var runButton = ui.Button({
  label: 'Starte Analyse',
  style: {
    margin: '0 0 15px 0',
    color: 'red',
    backgroundColor: '#4285F4'
  }
});
controlPanel.add(runButton);

// Add a status label
var statusLabel = ui.Label('', {margin: '0 0 0 0'});
controlPanel.add(statusLabel);

// Add the control panel to the map
mapPanel.add(controlPanel);

// Add the map to the UI root
ui.root.add(mapPanel);

// Add a legend panel
var legendPanel = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px'
  }
});

// Function to create legend
function createLegend() {
  legendPanel.clear();
  
  var legendTitle = ui.Label({
    value: '',
    style: {
      fontWeight: 'bold',
      fontSize: '16px',
      margin: '0 0 10px 0',
      padding: '0'
    }
  });
  legendPanel.add(legendTitle);
  
  // Add legend item for disturbance
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#FFFF00',
      padding: '8px',
      margin: '0 0 6px 0'
    }
  });
  
  var description = ui.Label({
    value: 'Mögliche Schadensfläche',
    style: {margin: '0 0 6px 8px'}
  });
  
  var legendItem = ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
  
  legendPanel.add(legendItem);
}

// Call createLegend to initialize the legend
createLegend();

// Add legend to the map
mapPanel.add(legendPanel);

// Function to validate date format and range
function validateDate(dateString) {
  // Check format
  var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return {
      valid: false,
      message: 'Date must be in YYYY-MM-DD format'
    };
  }
  
  // Check if it's a valid date
  var date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return {
      valid: false,
      message: 'Invalid date'
    };
  }
  
  // Check if date is after Apr 1, 2018
  var minDate = new Date('2018-04-01');
  if (date < minDate) {
    return {
      valid: false,
      message: 'Date must be after April 1, 2018'
    };
  }
  
  return {
    valid: true,
    message: 'Valid date'
  };
}

// Function to calculate all required dates based on reference date and duration
function calculate_dates(reference_date, duration_days) {
  // Convert reference date to ee.Date
  var ref_date = ee.Date(reference_date);
  
  // Calculate post-disturbance period dates
  var startdate_post = ref_date.advance(1, 'day'); // Start one day after the reference date
  var enddate_post = startdate_post.advance(duration_days, 'day'); // End after duration_days
  
  // Calculate pre-disturbance period dates (one year before)
  var startdate_pre = startdate_post.advance(-1, 'year');
  var enddate_pre = enddate_post.advance(-1, 'year');
  
  return {
    startdate_post: startdate_post.format('YYYY-MM-dd'),
    enddate_post: enddate_post.format('YYYY-MM-dd'),
    startdate_pre: startdate_pre.format('YYYY-MM-dd'),
    enddate_pre: enddate_pre.format('YYYY-MM-dd')
  };
}

// Function to calculate the normalized burn ratio
function calculate_nbr(startdate, enddate, aoi, forest_mask) {
  // Load the 10m and 20m resolution image collections
  var S2_col_10m = ee.ImageCollection('projects/satromo-prod/assets/col/S2_SR_HARMONIZED_SWISS')
                .filterDate(startdate, enddate)
                .filterBounds(aoi)
                .filter(ee.Filter.stringEndsWith('system:index', '10m'));
  
  var S2_col_20m = ee.ImageCollection('projects/satromo-prod/assets/col/S2_SR_HARMONIZED_SWISS')
                .filterDate(startdate, enddate)
                .filterBounds(aoi)
                .filter(ee.Filter.stringEndsWith('system:index', '20m'));
  
  // Apply the cloud and terrain shadow mask within the 10m S2 image collection
  var S2_col_10m_masked = S2_col_10m.map(function(image) {
    var cloudMask = image.select('cloudAndCloudShadowMask').eq(0);
    var shadowMask = image.select('terrainShadowMask').lt(65);
    return image.updateMask(cloudMask).updateMask(shadowMask);
  });
  
  // Get a list of image IDs from the 10m collection
  var imageIDs_10m = S2_col_10m_masked.aggregate_array('system:index');
  
  // Function to extract the base ID without the resolution suffix
  var getBaseID = function(id) {
    // Assuming the ID format is something like "YYYYMMDD_10m"
    return ee.String(id).slice(0, -3); // Remove the last 3 characters ("10m")
  };
  
  // Map over the 20m collection to find corresponding 10m images
  var S2_col_20m_masked = S2_col_20m.map(function(image20m) {
    // Get the base id by removing the "20m" suffix
    var id20m = ee.String(image20m.get('system:index'));
    var baseID = getBaseID(id20m);
    var swir = image20m.select(['B11']);
    
    // Find the corresponding 10m image (with "10m" suffix)
    var id10m = baseID.cat('10m');
    
    // Get the 10m image with this ID
    var image10m = ee.Image(
      S2_col_10m.filter(ee.Filter.eq('system:index', id10m)).first()
    );
    var green = image10m.select(['B3']);
    
    // Calculate NDSI to generate a snow mask
    var ndsi = green.subtract(swir).divide(green.add(swir)).rename('ndsi');
    
    // Create a mask from the 10m image
    var validMask = ee.Algorithms.If(
      ee.Algorithms.IsEqual(image10m, null),
      null,
      image10m.select('cloudAndCloudShadowMask').eq(0)
        .and(image10m.select('terrainShadowMask').lt(65))
        .and(ndsi.select('ndsi').lt(0.33))
    );
    
    // Apply the mask if it's valid, otherwise return the original image
    return ee.Algorithms.If(
      ee.Algorithms.IsEqual(validMask, null),
      image20m,
      image20m.updateMask(validMask)
    );
  });
  
  // Filter null images from the collection
  S2_col_20m_masked = S2_col_20m_masked.filter(ee.Filter.notNull(['system:index']));
  
  // Calculate NBR for the image collection
  var NBR_col = S2_col_20m_masked.map(function(image) {
    return image.normalizedDifference(['B8A', 'B11']).rename('nbr');
  });
  
  // Calculate median NBR
  var NBR = NBR_col.median().rename('median');
  
  // Apply forest mask
  NBR = NBR.updateMask(forest_mask);
  
  return NBR;
}

// Function to run the analysis
function runAnalysis() {
  // Clear previous layers
  mapPanel.layers().reset();
  
  // Show loading status
  //statusLabel.setValue('Analysis running...');
  
  // Get input values
  var reference_date = dateInput.getValue();
  var duration_days = 60;
  //var duration_days = parseInt(durationInput.getValue());
  
  // Validate date
  var dateValidation = validateDate(reference_date);
  if (!dateValidation.valid) {
    statusLabel.setValue('Error: ' + dateValidation.message);
    return;
  }
  
  // Validate duration
  if (isNaN(duration_days) || duration_days <= 0) {
    statusLabel.setValue('Error: Please enter a valid duration in days');
    return;
  }
  
  // Calculate dates
  var dates = calculate_dates(reference_date, duration_days);
  var startdate_post = dates.startdate_post;
  var enddate_post = dates.enddate_post;
  var startdate_pre = dates.startdate_pre;
  var enddate_pre = dates.enddate_pre;
  
  // Print dates to console (for debugging)
  print('Post-disturbance period:', startdate_post, 'to', enddate_post);
  print('Pre-disturbance period:', startdate_pre, 'to', enddate_pre);
  
  // Get AOI
  var aoi = ee.FeatureCollection('projects/satromo-prod/assets/res/CH_boundaries_buffer_5000m_epsg32632').geometry();
  
  // Get forest mask
  var forest_mask = ee.Image('projects/satromo-prod/assets/res/ch_bafu_lebensraumkarte_mask_forest_epsg32632');
  
  // Calculate NBR for post-disturbance period
  var NBR_post = calculate_nbr(startdate_post, enddate_post, aoi, forest_mask);
  
  // Calculate NBR for pre-disturbance period
  var NBR_pre = calculate_nbr(startdate_pre, enddate_pre, aoi, forest_mask);
  
  // Calculate dNBR (pre - post)
  var dNBR = NBR_post.subtract(NBR_pre).rename('dnbr');
  
  // Create binary mask layer for forest disturbance
  var disturbance_mask = dNBR.lte(-0.15);
  var disturbance = dNBR.updateMask(disturbance_mask);
  
  // Visualization parameters
  var vis_nbr = {min: 0.1, max: 0.8, palette: ['c8e6c9', '1b5e20']}; // greens
  var vis_dif = {min: -0.2, max: 0.2, palette: ['D32F2F', 'FFFDE7', '1976D2'], opacity: 1};
  var vis_disturbance = {palette: ['FFFF00'], opacity: 1};
  
  // Add year information to layer names based on the dates
  var pre_year = ee.Date(startdate_pre).get('year').getInfo();
  var post_year = ee.Date(startdate_post).get('year').getInfo();
  
  // Add layers to map
  //statusLabel.setValue('Füge Ebenen zur Karte hinzu...');
  mapPanel.addLayer(NBR_pre.select('median'), vis_nbr, 'NBR: ' + pre_year, false);
  mapPanel.addLayer(NBR_post.select('median'), vis_nbr, 'NBR: ' + post_year, false);
  mapPanel.addLayer(dNBR.select('dnbr'), vis_dif, 'NBR: Delta ' + pre_year + '/' + post_year, false);
  mapPanel.addLayer(disturbance, vis_disturbance, 'Mögliche Schadenfläche (dNBR ≤ -0.15)', true);
  
  // Update status
  //statusLabel.setValue('Analyse abgeschlossen');
}

// Add click handler to the run button
runButton.onClick(runAnalysis);

// Run initial analysis with default values
// Wait a bit to ensure UI is loaded before running analysis
ui.util.setTimeout(function() {
  try {
    runAnalysis();
  } catch (e) {
    statusLabel.setValue('Error: ' + e.message);
    print('Error during initial analysis:', e);
  }
}, 1000);
