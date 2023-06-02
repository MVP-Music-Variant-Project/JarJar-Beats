import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>JarJarBeats</Navbar.Brand>
          {/* These creates a button to specific links */}
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          {/* <NavItem><Link to="/artist" className="nav-link">artist</Link></NavItem> */}
          <NavItem><Link to="/playlist" className="nav-link">playlist</Link></NavItem>
          <NavItem><Link to="/about-us" className="nav-link">about-us</Link></NavItem>
          {this.props.auth0.isAuthenticated ? <Profile /> : <h2>Please login</h2>}
          {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Navbar>
      </>
    )
  }
}

export default withAuth0(Header);
