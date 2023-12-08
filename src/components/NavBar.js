import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";

// 5 past navbar from boostrap and edit all
// 6 create assets in src, past logo file and import logo
// 7 add favicon to public directory and index.html

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height={45} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link>
              <i className="fas fa-home mr-2"></i>Home
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-sign-in-alt mr-2"></i>Sign in
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user-plus mr-2"></i>Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

//
