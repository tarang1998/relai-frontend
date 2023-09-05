import Fade from 'react-reveal/Fade';
import { Grid } from '@material-ui/core';
import './metric.css';



const CalculatedMetric = ({ value }) => {
  return (

    <div className="metric">

      <Grid container xs={12} >

        <Grid item xs={12}>

          <Fade duration={2000}>
            <div className='metric-block'>
              <div className="metric-title">
                Calculated Metric:
              </div>
              <div className='metric-value'>
                {value.toFixed(2)}

              </div>

            </div>

          </Fade>

        </Grid>
      </Grid>


    </div>


  );
};

export default CalculatedMetric;