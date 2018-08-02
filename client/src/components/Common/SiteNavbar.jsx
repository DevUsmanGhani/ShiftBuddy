import React, { Component } from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class SiteNavbar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Shift Buddy</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            About
          </NavItem>
          <NavItem eventKey={2} href="#">
            Contact
          </NavItem>
          <NavItem eventKey={3} href="/managerlogin">
            Login <FontAwesomeIcon icon="sign-in-alt" />
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}

export default SiteNavbar
