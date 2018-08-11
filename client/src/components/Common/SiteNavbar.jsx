import React, { Component } from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { connect } from "react-redux";
import { logoutManager } from '../../actions/manager/managerAuthActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class SiteNavbar extends Component {
  
  loginButton() {
    return (
      <NavItem  eventKey={3} href="/managerlogin">
        Login <FontAwesomeIcon icon="sign-in-alt" /> 
      </NavItem>
    )
  }

  logoutButton() {
    const { manager } = this.props.managerAuth;
    return (
      <NavDropdown eventKey={4} title={manager.name} id="logged-in-manager-dropdown">
        <MenuItem onClick={this.props.logoutManager} eventKey={4.1} href="/">
          Logout <FontAwesomeIcon icon="sign-out-alt" /> 
        </MenuItem>
      </NavDropdown>
      
    )
  }
  render() {
    const { isAuthenticated } = this.props.managerAuth;

    return (
      <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a className="navbar-header" href="/">Shift Buddy Pro</a>
        </Navbar.Brand>  
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            About Us
          </NavItem>
          <NavItem eventKey={2} href="#">
            Contact 
          </NavItem>
          {isAuthenticated ? this.logoutButton() : this.loginButton()}      
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  managerAuth: state.managerAuth,
})


export default connect(mapStateToProps, { logoutManager })(SiteNavbar);
