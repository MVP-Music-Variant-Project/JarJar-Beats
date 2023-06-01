import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
import CreatePlaylistButton from './CreatePlaylistButton';
import axios from 'axios';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playlist: false
        }
    }

    getPlaylist = async() => {
        try {
            if (this.props.auth0.isAuthenticated) {
              const res = await this.props.auth0.getIdTokenClaims();
              const jwt = res.__raw;
              const config = {
                method: 'get',
                baseURL: process.env.REACT_APP_SERVER,
                url: '/playlist',
                headers: { "Authorization": `Bearer ${jwt}` }  
              }
              const result = await axios(config);
              if (result.data.length > 0) {
                this.setState({ playlist: result.data });
              }
            }
          } catch (err) {
            console.log("nay nay", err.response);
          }
    }

    componentDidMount() {
        this.getPlaylist();
    }

    componentDidUpdate() {
        this.getPlaylist();
    }

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
                    {this.props.auth0.isAuthenticated && !this.state.playlist && <CreatePlaylistButton />}
                    {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
                </Navbar>
            </>
        )
    }
}

export default withAuth0(Header);
