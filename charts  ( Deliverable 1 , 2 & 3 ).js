function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}


// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}



// Deliverable 1

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    console.log(data);
    var samplesArray = data.samples;
    console.log(samplesArray);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var selectedIdSamples = samplesArray.filter(data => data.id == sample);
    console.log(selectedIdSamples);
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = selectedIdSamples[0];
    console.log(firstSample);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firstSample.otu_ids;
    var otuLabels = firstSample.otu_labels;
    var sampleValues = firstSample.sample_values;


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otuIds.slice(0,10).map(id => "OTU " + id).reverse();
    
    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h",
    } 
    ];


    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "top 10 Bacteria Found",
      yaxis: {
        tickmode: "array",
        tickvals: [0,1,2,3,4,5,6,7,8,9],
        ticktext: yticks
      },
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        xanchor: 'center',
        y: -0.25,
        yanchor: 'center',
        text: 'These are the most common bacteria found in your belly button<br>',
        showarrow: false
      }]     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout, {responsive: true});
  });
}



// Deliverable 2
    
// 1. Create the trace for the bubble chart.
var bubbleData = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
    }
}];

// 2. Create the layout for the bubble chart.
var bubbleLayout = {
  title: "Bacteria Per Sample",
  showlegend: false,
        xaxis: {title: "OTU ID", automargin: true},
        yaxis: {automargin: true},
        //plot_bgcolor: "aliceblue",
        hovermode: "closest"  
};

// 3. Use Plotly to plot the data with the layout.
Plotly.newPlot("bubble", bubbleData, bubbleLayout, {responsive: true}); 




// Deliverable 3

// 1. Create a variable that filters the metadata array for the object with the desired sample number.
var metadata_SelId = data.metadata.filter(data => data.id == sample);


// Create a variable that holds the first sample in the array.
var metadata = data.metadata;

// 2. Create a variable that holds the first sample in the metadata array.
var metadataResult = filtermetadata[0];

// Create variables that hold the otu_ids, otu_labels, and sample_values.
var otu_ids = firstSample.otu_ids
var otu_labels = firstSample.otu_labels
var sample_values = firstSample.sample_values

// 3. Create a variable that holds the washing frequency.
var washing_frequency = metadataResult.washing_frequency;
// Create the yticks for the bar chart.
var yticks = otu_ids.slice(0,10).map(value => `otu ${value}`).reverse();
// Use Plotly to plot the bar data and layout.
Plotly.newPlot("bar", barData, barLayout, {responsive: true});
 
// Use Plotly to plot the bubble data and layout.
Plotly.newPlot("bubble", bubbleData, bubbleLayout, {responsive: true}); 

// 4. Create the trace for the gauge chart.
var gaugeData = [{

  value: washing_frequency,
  type: "indicator",
  mode: "gauge+number",
  title: "Washing Frequency",
  gauge: {
    maximum: {range: [0,10]},
    bar: {color: "black"},
    differentColors: [
      {range: [0,2], color: "lime"},
      {range: [2,4], color: "navy"},
      {range: [4,6], color: "aqua"},
      {range: [6,8], color: "teal"},
      {range: [8,10], color: "red"}
    ]
  }
}
];

// 5. Create the layout for the gauge chart.
var gaugeLayout = { 
  autosize: true,
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        xanchor: 'center',
        y: 0,
        yanchor: 'center',
        text: "The number of times you wash your belly button per week",
        showarrow: false
      }]
};


// 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot("gauge", gaugeData, gaugeLayout, {responsive: true} );


