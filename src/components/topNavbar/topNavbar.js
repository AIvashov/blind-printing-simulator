import React from "react";
import {Navbar} from 'react-bootstrap';
import './topNavbar.css'

const TopNavbar = () => {
    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand className="top-navbar-brand" >Blind printing simulator</Navbar.Brand>
            </Navbar>
};

export default TopNavbar;

