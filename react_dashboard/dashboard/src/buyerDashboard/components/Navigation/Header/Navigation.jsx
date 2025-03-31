import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import NavLinks from './NavLinks';
import logo from '../../images/sprout.png';

import './Navigation.css';

const Navigation = () => {
    return (
        <Navbar className="header-nav" sticky="top" expand="lg">
            <Navbar.Brand href="/">
                <img src={logo} alt="Logo" className="nav-logo" /> {/* ✅ Add class for styling */}
                <span className="brand-name">AGRI CONNECT</span> {/* ✅ Add text separately */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto"> {/* ✅ Align menu to the right */}
                    <NavLinks />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
