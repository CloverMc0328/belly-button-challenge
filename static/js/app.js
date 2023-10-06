
// Place json url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Obtain Json data and console log
d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize to get data from url
function init() {

    let dropdownMenu = d3.select("#selDataset"); 

    d3.json(url).then((data) => {


        let names = data.names; 

        names.forEach((id) => {
            console.log(id);
            dropdownMenu.append("option").text(id).property("value", id);
        });

        let default_sample = names[0];

        horizontalBar_chart(default_sample);

        bubble_chart(default_sample);

        metadata_table(default_sample)
    })
};


// Build horizontal bar chart

function horizontalBar_chart (sample) {
    d3.json(url).then((data) => {

        let sample_value = data.samples;

        let value = sample_value.filter(result => result.id === sample);

        let DataValue = value[0];

        let otu_ids = DataValue.otu_ids;
        let otu_labels = DataValue.otu_labels
        let sample_values = DataValue.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        let y_tick = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let x_tick = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        let horizontal_bar_trace = {
            x: x_tick,
            y: y_tick,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "Top 10 OTUs Present"
        };
        
        let horizontal_bar_trace_data = [horizontal_bar_trace];

        Plotly.newPlot("bar", horizontal_bar_trace_data, layout)
    });
};

// Build Bubble Chart

function bubble_chart(sample) {
    d3.json(url).then((data) => {
        let sample_value = data.samples;

        let value = sample_value.filter(result => result.id === sample);

        let DataValue = value[0];

        let otu_ids = DataValue.otu_ids;
        let otu_labels = DataValue.otu_labels
        let sample_values = DataValue.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        let bubble_trace = {
            x: otu_ids,
            y: sample_values, 
            text: otu_labels,
            mode: "markers",
            marker:{
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let bubble_trace_data = [bubble_trace];

        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closet",
            xaxis: {title: "OTU ID"},
        };

        Plotly.newPlot("bubble", bubble_trace_data, layout)
    });
};

// Build metadata table

function metadata_table(sample) {
    d3.json(url).then((data) => {

        let metadata = data.metadata;

        let metadataValue = metadata.filter(result => result.id == sample);

        console.log(metadataValue);

        // reset metadata_table 
        
        d3.select("#sample-metadata").html("") 

        let table_value = metadataValue[0];

        console.log(table_value);
  
        Object.entries(table_value).forEach(([key,value]) => {
            
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};


// Update all dashboards based on user selection 

function optionChanged(selected_id) {

    console.log(selected_id);

    horizontalBar_chart(selected_id);

    bubble_chart(selected_id);

    metadata_table(selected_id);
};


// Run the init() function
init();





    
