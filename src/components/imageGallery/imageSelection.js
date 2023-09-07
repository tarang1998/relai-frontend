
import React, { useState } from "react";
import Fade from 'react-reveal/Fade';
import { Grid } from '@material-ui/core';
import { Gallery } from "react-grid-gallery";
import "./imageSelection.css";


const ImageSelection = ({ data, windowDimension }) => {


    const [calculatedMetric, setCalculatedMetric] = useState(0);

    const handleMetricOnImageSelection = (value) => {
        setCalculatedMetric(value);
    };


    const [selectedImages, setSelectedImages] = useState([]);

    // const getImages = () => {

    //     var imageData = []

    //     for (const [key, value] of Object.entries(data)) {

    //         imageData.push({
    //             width: 200,
    //             height: 200,

    //             isSelected: selectedImages.includes(key),
    //             src: `images/cats_vs_dogs/${key}`,
    //             alt: `${key}-${value}`
    //         })


    //     }

    //     return imageData

    // }

    // const handleImageSelection = (index, image) => {

    //     const imageName = image.src.split("/").pop()
    //     if (selectedImages.includes(imageName)) {
    //         setSelectedImages(selectedImages.filter((selected) => selected !== imageName));
    //     } else {
    //         setSelectedImages([...selectedImages, imageName]);
    //     }


    // }

    const handleImageSelection2 = (imageName) => {
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
        handleMetricOnImageSelection(metric);
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

                <Grid item xs={12} >

                    <Fade duration={2000}>
                        <div className='metric-block'>
                            <div className="metric-title">
                                Calculated Metric:
                            </div>
                            <div className='metric-value'>
                                {calculatedMetric.toFixed(2)}

                            </div>

                        </div>

                    </Fade>

                </Grid>


            </Grid>




            {/* <div className="image-selection-container">
                <Gallery
                    images={getImages()}
                    onSelect={handleImageSelection}
                    onClick={handleImageSelection}
                    rowHeight={190}
                    // maxRows={4}
                    // defaultContainerWidth={100}
                />

            </div> */}


            <div className="image-selection-container">

                {Object.keys(data).map((imageName) => (

                    <div >
                        <Fade duration={2000}>

                            <div key={imageName}>
                                <div

                                    className={`image-container${selectedImages.includes(imageName) ? "-selected" : ""}`}
                                    onClick={() => handleImageSelection2(imageName)}
                                >
                                    <img
                                        style={{
                                            // display : "flex",
                                            // flexDirection:"column",
                                            // width: windowDimension.width> 1000 ? "200px" : windowDimension.width> 700 ? "170px" : "150px",
                                            height: windowDimension.width> 1000 ? "200px" : windowDimension.width> 700 ? "150px" : windowDimension.width> 500 ? "100px" : windowDimension.width> 500 ? "50px" : "25px",
                                            width: "-webkit-fill-available"
                                        }}
                                        src={require(`../../../public/images/cats_vs_dogs/${imageName}`)} alt="" />
                                </div>
                            </div>
                        </Fade>

                    </div>


                ))}

            </div>

        </div>
    );
};

export default ImageSelection;
