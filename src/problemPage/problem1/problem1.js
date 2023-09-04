import React from "react";
import LineChart from "../../components/LineChart/lineChart";
import BarChart from "../../components/barChart/barChart";
import "./problem1.css";
const problem1Data = require("../../data/problem1Data.json");


const Problem1 = () => {

    const modelNames = ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"];

    const modelNameColors = ["#0046ff", "#ff7800", "#f53400", "#50bf03", "#a003bf"]


    return (


        <div className='problem1Page' >


            <LineChart className="line-chart"
                modelNames={modelNames}
                modelNameColors={modelNameColors}
                losses={problem1Data["losses"]}
            />


            <BarChart className = "bar-chart"
                modelNames={modelNames}
                confusion_matrix = {problem1Data["confusion_matrices"]}
            />





        </div>




    );
};

export default Problem1;
