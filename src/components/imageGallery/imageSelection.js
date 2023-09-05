
import React, { useState } from "react";
import Fade from 'react-reveal/Fade';
import { Grid } from '@material-ui/core';
import "./imageSelection.css";


const ImageSelection = ({ onMetricUpdate, data }) => {




    const [selectedImages, setSelectedImages] = useState([]);

    const toggleImageSelection = (image) => {
        if (selectedImages.includes(image)) {
            setSelectedImages(selectedImages.filter((selected) => selected !== image));
        } else {
            setSelectedImages([...selectedImages, image]);
        }
    };

    // Calculate metric and pass it to the parent component
    const calculateMetric = () => {
        const selectedScores = selectedImages.map((image) => data.scores[image]);
        const nonSelectedScores = Object.keys(data.scores).filter(
            (image) => !selectedImages.includes(image)
        );

        const selectedAverage = selectedScores.reduce((acc, score) => acc + score, 0) / selectedScores.length;
        const nonSelectedAverage = nonSelectedScores.reduce((acc, image) => acc + data.scores[image], 0) / nonSelectedScores.length;

        const metric = selectedAverage - (1 / nonSelectedScores.length) * nonSelectedAverage;
        onMetricUpdate(metric);
    };

    // Update metric when selection changes
    // React.useEffect(() => {
    //     calculateMetric();
    // }, [selectedImages]);

    return (
        <div className="image-selection">

            <Grid container xs={12} >

                <Grid item xs={12}>

                    <Fade duration={2000}>
                        <div className="image-selection-title">
                            Image Metrics
                        </div>

                    </Fade>

                </Grid>
            </Grid>

            <Grid container xs={12} className="image-selection-container">


                {Object.keys(data).map((imageName) => (

                    <Grid item  xl={4} lg={4} md={4} xs={12}>
                        <Fade duration={2000}>

                            <div key={imageName}>
                                <div

                                    className={`image-container${selectedImages.includes(imageName) ? "-selected" : ""}`}
                                    onClick={() => toggleImageSelection(imageName)}
                                >
                                    <img
                                        style={{
                                            // display : "flex",
                                            // flexDirection:"column",
                                            // width : "300px",
                                            height : "350px",
                                            width : "-webkit-fill-available"
                                        }}
                                        src={require(`../../data/cats_vs_dogs/${imageName}`)} alt={`Image ${imageName}`} />
                                </div>
                            </div>
                        </Fade>

                    </Grid>


                ))}


            </Grid>

        </div>
    );
};

export default ImageSelection;
