import React from 'react';
import Plot from 'react-plotly.js';

const RadarChartComponent = ({ radarData }) => {

    const modelNames = ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"];
    
    const metricLabels = ["Metric #1", "Metric #2", "Metric #3", "Metric #4", "Metric #5"];

    // Transpose the radarData to have metrics as rows and models as columns
    const transposedData = radarData[0].map((col, i) => radarData.map(row => row[i]));

    const data = modelNames.map((modelName, modelIndex) => {
        return {
            type: 'scatterpolar',
            r: transposedData[modelIndex],
            theta: metricLabels,
            fill: 'toself',
            name: modelName,
        };
    });

    return (
        <div>
            <Plot
                data={data}
                layout={{
                    polar: {
                        radialaxis: {
                            visible: true,
                            range: [0, 1], // Adjust the range as needed
                        },
                    },
                    showlegend: true,
                }}
            />
        </div>
    );
};

export default RadarChartComponent;
