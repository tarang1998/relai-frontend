import React from 'react';
import Plot from 'react-plotly.js';
import Fade from 'react-reveal/Fade';
import { Grid } from '@material-ui/core';
import "./radarChart.css";


const RadarChart = ({ radarData, modelNames }) => {


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

        <div className="radar-chart">

            <Grid container xs={12} >

                <Grid item xs={12}>

                    <Fade duration={2000}>
                        <div className="radar-chart-title">
                            Radar Data
                        </div>

                    </Fade>

                </Grid>

                <Grid item xs={12} >

                    <Fade left duration={2000}>
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
                    </Fade>

                </Grid>

            </Grid>

        </div>


    );
};

export default RadarChart;
