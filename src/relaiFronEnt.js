import { Container, Grid } from "@material-ui/core";
import Header from "./components/Header/header";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import React, { useState, useEffect } from "react";
import Problem1 from "./problemPage/problem1/problem1";
import Problem2 from "./problemPage/problem2/problem2";



function RelaiFrontEnd() {

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }

  return (
    <div >
      <Container maxWidth="xl" className="top-20">
        <Grid container spacing={3}>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

            <Router>

              <Header />

              <Fade duration={1000} bottom>
                <div className="main_content">

                  <Switch>

                    <Route
                      exact
                      path="/"
                      render={() => {
                        return (<Redirect to="/problem1" />)
                      }}>

                    </Route>

                    <Route path="/problem1">
                      <Problem1
                        windowDimension={useWindowDimensions()} />
                    </Route>

                    <Route path="/problem2">
                      <Problem2
                      windowDimension = {useWindowDimensions()}
                        />
                    </Route>



                  </Switch>
                </div>
              </Fade>
            </Router>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default RelaiFrontEnd;
