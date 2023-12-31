import React, { useState } from "react";
import Plot from 'react-plotly.js';
import Slider from '@material-ui/core/Slider';
import Fade from 'react-reveal/Fade';
import { Grid } from '@material-ui/core';
import "./lineChart.css";



const LineChart = ({ modelNames, modelNameColors, losses, windowDimension }) => {

    const [smoothingFactor, setSmoothingFactor] = useState(1);
    const [selectedModels, setSelectedModels] = useState(Array(5).fill(true));

    const smoothingValues = [
        {
            value: 0,
            label: '0',
        },
        // {
        //     value: 0.1,
        //     label: '0.1',
        // },
        // {
        //     value: 0.2,
        //     label: '0.2',
        // }, {
        //     value: 0.3,
        //     label: '0.3',
        // }, {
        //     value: 0.4,
        //     label: '0.4',
        // }, {
        //     value: 0.5,
        //     label: '0.5',
        // }, {
        //     value: 0.6,
        //     label: '0.6',
        // }, {
        //     value: 0.7,
        //     label: '0.7',
        // }, {
        //     value: 0.8,
        //     label: '0.8',
        // }, {
        //     value: 0.9,
        //     label: '0.9',
        // }, 
        {
            value: 1,
            label: '1',
        },
    ];




    const toggleModelSelection = (modelIndex) => {
        const updatedSelection = [...selectedModels];
        updatedSelection[modelIndex] = !updatedSelection[modelIndex];
        setSelectedModels(updatedSelection);
    };

    const smoothLoss = (lossData, factor) => {
        const smoothedData = [];
        smoothedData.push(lossData[0])
        for (let j = 1; j < lossData.length; j++) {
            const smoothedValue = factor * lossData[j] + (1 - factor) * smoothedData[j - 1]
            smoothedData.push(smoothedValue);
        }
        return smoothedData;
    };


    const getData = () => {

        var data = []

        for (let i = 0; i < modelNames.length; i++) {

            if (!selectedModels[i]) {
                continue
            }

            const rawLossData = losses[i];
            const smoothedLossData = smoothLoss(rawLossData, smoothingFactor);

            data.push({
                x: Array.from({ length: smoothedLossData.length }, (_, i) => i + 1),
                y: smoothedLossData,
                type: 'line',
                mode: 'lines',
                name: modelNames[i],
                line: {
                    color: modelNameColors[i]
                }

            });
        }

        return data;
    };





    return (
        <div className="line-chart">


            <Grid container xs={12} >

                <Grid item xs={12}>

                    <Fade duration={2000}>
                        <div className="line-chart-title">
                            Loss Values
                        </div>

                    </Fade>

                </Grid>

                <Grid item xs={12} md={10} lg={10} xl={10}>

                    <Fade left duration={2000}>
                        <Plot className="line-chart-plot"
                            data={getData()}
                            layout={{
                                title: '',
                                xaxis: { 
                                    title: 'Steps',
                                    range: [0,5100]
                                },
                                yaxis: { 
                                    title: 'Loss' ,
                                    range : [-0.4, 1.2]
                                },
                                showlegend: false,
                                margin: {
                                    l: 50,
                                    r: 50,
                                    b: 50,
                                    t: 20,
                                    pad: 4
                                },

                                height: windowDimension.width > 1200 ? 500 : windowDimension.width > 1000 ? 600 : 500,
                                width: windowDimension.width > 1200 ? 1000 : windowDimension.width > 1000 ? 800 : windowDimension.width > 900 ? 800 : windowDimension.width > 800 ? 700 : windowDimension.width > 700 ? 600 : windowDimension.width > 600 ? 550 : windowDimension.width > 500 ? 450 : 350



                            }}
                        />

                    </Fade>

                </Grid>

                <Grid item xs={12} md={2} lg={2} xl={2}>


                    <Fade right duration={2000}>

                        <div className="model-selection">
                            {/* <p className="model-selection-title">Model Selection</p> */}
                            {modelNames.map((modelName, modelIndex) => (
                                <label key={modelIndex} className="model-selection-checkbox">
                                    <div style={{
                                        backgroundColor: modelNameColors[modelIndex]
                                    }} class="model-selection-checkbox-dot" ></div>
                                    <input className="model-selection-checkbox-input"
                                        type="checkbox"
                                        checked={selectedModels[modelIndex]}
                                        onChange={() => toggleModelSelection(modelIndex)}
                                    />
                                    {modelName}

                                </label>

                            ))}
                        </div>

                    </Fade>

                </Grid>

                <Grid item xs={3}>

                    <Fade right duration={1500}>
                        <div className="smoothing-factor">
                            <p className="smoothing-factor-title">Smoothing Factor</p>
                            <Slider
                                value={smoothingFactor}
                                min={0}
                                max={1}
                                step={0.1}
                                // marks
                                marks={smoothingValues}
                                valueLabelDisplay="auto"
                                aria-label="Default"
                                onChange={(event, newValue) => {
                                    console.log(`Smoothing factor : ${newValue}`)
                                    setSmoothingFactor(newValue)
                                }}
                            />
                        </div>

                    </Fade>


                </Grid>

            </Grid>

        </div>

    );
};

export default LineChart;
