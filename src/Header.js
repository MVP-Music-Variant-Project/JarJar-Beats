import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>JarJar beats cult, please take a drink, it won't hurt you we swear</Navbar.Brand>
                    {/* These creates a button to specific links */}
                    <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
                    <NavItem><Link to="/artist" className="nav-link">artist</Link></NavItem>
                    <NavItem><Link to="/playlist" className="nav-link">playlist</Link></NavItem>
                    <NavItem><Link to="/about-us" className="nav-link">about-us</Link></NavItem>
                </Navbar>
            </>
        )
    }
}

export default Header;