
import React, { useState } from "react";
import Fade from 'react-reveal/Fade';
import { Grid } from '@material-ui/core';
import { Gallery } from "react-grid-gallery";
import "./imageSelection.css";


const ImageSelection = ({ onImageSelection, data }) => {




    const [selectedImages, setSelectedImages] = useState([]);

    const getImages = () => {

        var imageData = []

        for (const [key, value] of Object.entries(data)) {

            imageData.push({
                width :350,
                height: 350,
                
                isSelected: selectedImages.includes(key),
                src: `images/cats_vs_dogs/${key}`,
                alt: `${key}-${value}`
            })


        }

        return imageData

    }

    const handleImageSelection = (index,image) => {

        const imageName = image.src.split("/").pop()
        if (selectedImages.includes(imageName)) {
            setSelectedImages(selectedImages.filter((selected) => selected !== imageName));
        } else {
            setSelectedImages([...selectedImages, imageName]);
        }


    }

   

    const calculateMetric = () => {

        var selectedImageScores = 0
        var selectedImageCount = 0

        var nonSelectedImageScores = 0
        var nonSelectedImageCount = 0

        for (const [key, value] of Object.entries(data)) {
            if (selectedImages.includes(key)) {
                console.log(`Selected : ${key} - ${value}`)
                selectedImageScores += value
                selectedImageCount += 1
            }
            else {
                console.log(`Non Selected : ${key} - ${value}`)

                nonSelectedImageScores += value
                nonSelectedImageCount += 1
            }

        }

        var selectedImageAverage = 0
        if (selectedImageCount !== 0) {
            selectedImageAverage = selectedImageScores / selectedImageCount

        }

        var nonSelectedImageAverage = 0
        if (nonSelectedImageCount !== 0) {
            nonSelectedImageAverage = nonSelectedImageScores / nonSelectedImageCount
        }

        console.log(`Selected Image Average : ${selectedImageAverage}`)

        console.log(`Non selected Image Average : ${nonSelectedImageAverage}`)


        const metric = selectedImageAverage - nonSelectedImageAverage;
        onImageSelection(metric);
    };

    React.useEffect(() => {
        calculateMetric();
    }, [selectedImages]);

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

            <div className="image-selection-container">
                <Gallery 
                images={getImages()} 
                onSelect = {handleImageSelection}
                onClick = {handleImageSelection}
                rowHeight = {250}
                />

            </div>


            {/* <Grid container xs={12} className="image-selection-container">

                {Object.keys(data).map((imageName) => (

                    <Grid item xl={4} lg={4} md={4} xs={12}>
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
                                            height: "350px",
                                            width: "-webkit-fill-available"
                                        }}
                                        src={require(`../../data/cats_vs_dogs/${imageName}`)} alt="" />
                                </div>
                            </div>
                        </Fade>

                    </Grid>


                ))} 


            </Grid> */}

        </div>
    );
};

export default ImageSelection;
