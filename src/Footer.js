import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar className='footer' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>&copy; Dan Quinn, Tiffani Rice, Anthony Sinistsa, Andrew Carroll, Ashley Taylor, Jared Ciccarello</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
