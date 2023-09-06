import React from 'react';
import Plot from 'react-plotly.js';
import Fade from 'react-reveal/Fade';
import { Grid } from '@material-ui/core';
import "./barChart.css";


const BarChart = ({ modelNames, modelColors, confusion_matrix, windowDimension }) => {


    const classAccuraciesLabels = ['Class #1', 'Class #2']

    var barGraphData = []


    for (let i = 0; i < confusion_matrix.length; i++) {


        const truePositives = confusion_matrix[i][0][0]
        const falsePositives = confusion_matrix[i][0][1]

        const trueNegative = confusion_matrix[i][1][1]
        const falseNegatives = confusion_matrix[i][1][0]

        const class1Accuracy = truePositives / (truePositives + falseNegatives)
        const class2Accuracy = trueNegative / (trueNegative + falsePositives)

        const modelAccuracy = [class1Accuracy, class2Accuracy]

        barGraphData.push({
            x: classAccuraciesLabels,
            y: modelAccuracy,

            width: [0.07, 0.07],
            text: modelAccuracy.map((ele) => ele.toFixed(2)),
            textposition: 'auto',
            name: modelNames[i],
            opacity: 0.7,
            marker: {
                color: modelColors[i],
                line: {
                    width: 1
                }
            },
            type: "bar"
        })


    }



    return (

        <div className="bar-chart">


            <Grid container xs={12} >

                <Grid item xs={12}>

                    <Fade duration={2000}>
                        <div className="bar-chart-title">
                            Model Accuracies
                        </div>

                    </Fade>

                </Grid>

                <Grid item xs={12} >

                    <Fade right duration={2000}>
                        <Plot className='bar-chart-plot'

                            data={barGraphData}

                            layout={{
                                barmode: "group",
                                // bargap: 0.1,
                                bargap : 0.6,

                                height: windowDimension.width > 1200 ? 600 : windowDimension.width > 1000 ? 600 : 500,
                                width: windowDimension.width > 1200 ? 1000 : windowDimension.width > 1000 ? 800 : windowDimension.width > 800 ? 600 : windowDimension.width > 600 ? 500 : 400,
                                title: "",
                                xaxis: {
                                    title: "Classes",
                                },
                                yaxis: {
                                    title: "Accuracy",
                                    range: [0, 1.1]
                                },
                                margin: {
                                    l: 50,
                                    r: 50,
                                    b: 50,
                                    t: 20,
                                    pad: 4
                                },

                            }}

                        />
                    </Fade>

                </Grid>


            </Grid>

        </div>


    );
};

export default BarChart;
