// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    // Create a variable that holds the first sample in the array.
    var filtermetadata = metadata.filter(sampleObject => sampleObject.id == sample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var metadataResult = filtermetadata[0];
  
    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = sample.otu_ids
    var otu_labels = sample.otu_labels
    var sample_values = sample.sample_values

    // 3. Create a variable that holds the washing frequency.
    var washing_frequency = metadataResult.washing_frequency;
    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0,10).map(value => `otu ${value}`).reverse();
    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData, barLayout);
     
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
    
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
      margin: {top:10, bottom:0, left:15, right:25}
    };


    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
