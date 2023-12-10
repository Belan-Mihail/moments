import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";

// 5 past navbar from boostrap and edit all
// 6 create assets in src, past logo file and import logo
// 7 add favicon to public directory and index.html

const NavBar = () => {
  return (
    // 16 app.js 
    // 15 add className and import
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        {/* 22 navbar css */}
        {/* 21 and import navlink */}
        
        <NavLink to='/'>
        <Navbar.Brand>
          <img src={logo} alt="logo" height={45} />
        </Navbar.Brand> </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {/* 21 delete . from NavLink */}
            {/* 23 classname */}
            <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to='/'>
              <i className="fas fa-home mr-2"></i>Home
            </NavLink>
            {/* 23 classname */}
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/signin'>
              <i className="fas fa-sign-in-alt mr-2"></i>Sign in
            </NavLink>
            {/* 23 classname */}
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/signup'>
              <i className="fas fa-user-plus mr-2"></i>Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

//
