import React, { useState } from "react";
import Plot from 'react-plotly.js';
import Slider from '@material-ui/core/Slider';
import Fade from 'react-reveal/Fade';
import { Grid } from '@material-ui/core';
import "./lineChart.css";



const LineChart = ({ modelNames, modelNameColors, losses }) => {

    const [smoothingFactor, setSmoothingFactor] = useState(1);
    const [selectedModels, setSelectedModels] = useState(Array(5).fill(true));



    const toggleModelSelection = (modelIndex) => {
        const updatedSelection = [...selectedModels];
        updatedSelection[modelIndex] = !updatedSelection[modelIndex];
        setSelectedModels(updatedSelection);
    };

    const smoothLoss = (lossData, factor) => {
        const smoothedData = [];
        for (let j = 0; j < lossData.length; j++) {
            const startIdx = Math.max(0, j - factor + 1);
            const endIdx = j + 1;
            const smoothedValue = lossData
                .slice(startIdx, endIdx)
                .reduce((a, b) => a + b) / (endIdx - startIdx);
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

                <Grid item xs={12} md={7}>

                    <Fade left duration={2000}>
                        <Plot className="line-chart-plot"
                            data={getData()}
                            layout={{
                                title: '',
                                xaxis: { title: 'Steps' },
                                yaxis: { title: 'Loss' },
                                showlegend: false,
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

                <Grid item xs={12} md={5} >


                    <Fade right duration={2000}>

                        <div className="model-selection">
                            <p className="model-selection-title">Model Selection</p>
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


                    <Fade right duration={1500}>
                        <div className="smoothing-factor">
                            <p className="smoothing-factor-title">Smoothing Factor</p>
                            <Slider
                                value={smoothingFactor}
                                min={1}
                                max={10}
                                step={0.1}
                                onChange={(event, newValue) => {
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
