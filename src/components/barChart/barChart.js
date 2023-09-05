import React from 'react';
import Plot from 'react-plotly.js';
import Fade from 'react-reveal/Fade';
import { Grid } from '@material-ui/core';
import "./barChart.css";


const BarChart = ({ modelNames, confusion_matrix }) => {


    var class1Accuracies = []
    var class2Accuracies = []


    for (let i = 0; i < confusion_matrix.length; i++) {

        const truePositives = confusion_matrix[i][0][0]
        const falsePositives = confusion_matrix[i][0][1]

        const trueNegative = confusion_matrix[i][1][1]
        const falseNegatives = confusion_matrix[i][1][0]

        class1Accuracies.push((truePositives / (truePositives + falseNegatives)))
        class2Accuracies.push((trueNegative / (trueNegative + falsePositives)))

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

                            data={[

                                {
                                    x: modelNames,
                                    y: class1Accuracies,
                                    name: "Class #1 Accuracy",
                                    type: "bar"
                                },

                                {
                                    x: modelNames,
                                    y: class2Accuracies,
                                    name: 'Class #2 Accuracy',
                                    type: "bar"
                                }


                            ]}

                            layout={{
                                barmode: "group",
                                title: "",
                                xaxis: {
                                    title: "Model",
                                },
                                yaxis: {
                                    title: "Accuracy"
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
