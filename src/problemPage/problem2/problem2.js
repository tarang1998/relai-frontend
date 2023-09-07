import React ,{ useState }from "react";
import ImageSelection from "../../components/imageGallery/imageSelection";
import CalculatedMetric from "../../components/metric/metric";
import './problem2.css';
const problem2Data = require("../../data/problem2Data.json");


const Problem2 = ({windowDimension}) => {



    return (


        <div className='problem2Page'>

            <ImageSelection
                className="image-selection"
                data={problem2Data}
                windowDimension = {windowDimension}
            />

            {/* <CalculatedMetric 
            className = "calculated-metric"
            value={calculatedMetric} /> */}


        </div>




    );
};

export default Problem2;
