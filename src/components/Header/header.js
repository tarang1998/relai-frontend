import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, withRouter, useLocation } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import "./header.css";




const Header = (props) => {


  const location = useLocation();
  const pathName = location.pathname;


  return (
    <Fade duration={1000} top>
      <Navbar
        sticky="top"
        className="header"
        expand="lg"

      >

        <Nav.Link as={NavLink} to="/problem1">
          <Navbar.Brand className="header_home">
            RELAI 
          </Navbar.Brand>
        </Nav.Link>

        <Navbar.Toggle />


        <Navbar.Collapse>
          <Nav className="header-left">
            <Nav.Link
              as={NavLink}
              to="/problem1"
              className={pathName == "/problem1" ? "header_link_active" : "header_link"}
            >
              Problem 1
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/problem2"
              className={
                pathName == "/problem2" ? "header_link_active" : "header_link"
              }

            >
              Problem 2
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fade>
  );
};

export default withRouter(Header);
