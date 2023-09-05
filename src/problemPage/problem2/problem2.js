import React ,{ useState }from "react";
import ImageSelection from "../../components/imageGallery/imageSelection";
import Metric from "../../components/metric/metric";
const problem2Data = require("../../data/problem2Data.json");


const Problem2 = () => {

    const [metric, setMetric] = useState(0);

    const handleMetricUpdate = (newMetric) => {
        setMetric(newMetric);
    };


    return (


        <div className='problem2Page' >

            <ImageSelection
                className="image-selection"
                data={problem2Data}
                onMetricUpdate={handleMetricUpdate}
            />

            <Metric metric={metric} />


        </div>




    );
};

export default Problem2;
