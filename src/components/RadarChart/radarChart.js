import React from 'react';
import Plot from 'react-plotly.js';
import Fade from 'react-reveal/Fade';
import { Grid } from '@material-ui/core';
import "./radarChart.css";


const RadarChart = ({ data, modelNames, windowDimension }) => {


    const metrics = ["Metric #1", "Metric #2", "Metric #3", "Metric #4", "Metric #5"];

    const radarData = data.map((modelData,index) => {
        return {
            type: 'scatterpolar',
            r: modelData,
            theta: metrics,
            fill: 'toself',
            name: modelNames[index],
        };
    });

    return (

        <div className="radar-chart">

            <Grid container xs={12} >

                <Grid item xs={12}>

                    <Fade duration={2000}>
                        <div className="radar-chart-title">
                            Radar Data for 5 Models on 5 Metrics
                        </div>

                    </Fade>

                </Grid>

                <Grid item xs={12} >

                    <Fade left duration={2000}>
                        <Plot
                            data={radarData}
                            layout={{
                                polar: {
                                    radialaxis: {
                                        ticksuffix: '',
                                        showline: true,
                                        angle: 0,
                                        visible: true,
                                        range: [0, 1],
                                    },
                                },
                                height: windowDimension.width > 1200 ? 800 : windowDimension.width > 1000? 600 : 500, 
                                width: windowDimension.width > 1200 ? 1000 : windowDimension.width > 1000? 800 : windowDimension.width > 800? 600 : windowDimension.width > 600 ? 500 : 400,
                                showlegend: true,
                                legend: {
                                    orientation: 'v',

                                  },
                                //   title: 'Radar Chart',
                            }}
                        />
                    </Fade>

                </Grid>

            </Grid>

        </div>


    );
};

export default RadarChart;
