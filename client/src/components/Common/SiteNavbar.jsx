import React, { Component } from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { connect } from "react-redux";
import { logoutManager } from '../../actions/manager/managerAuthActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class SiteNavbar extends Component {
  
  publicLinks() {
    return (
      <Nav pullRight>
        <NavItem eventKey={1.1} href="/about">
          About
        </NavItem>
        {/* <NavItem eventKey={2.1} href="/contact">
          Contact 
        </NavItem> */}
        <NavItem  eventKey={3.1} href="/managers/login">
          Login <FontAwesomeIcon icon="sign-in-alt" /> 
        </NavItem>
      </Nav>
      
    )
  }

  managerLinks() {
    const { manager } = this.props.managerAuth;
    return (
      <Nav pullRight>
        <NavItem eventKey={1.1} href={`/managers/${manager.id}/shifts`}>
          Shifts
        </NavItem>
        <NavItem eventKey={2.1} href={`/managers/${manager.id}/employees`}>
          Employees 
        </NavItem>
        <NavDropdown className="dropdown-container" eventKey={4} title={manager.name} id="logged-in-manager-dropdown">
          <MenuItem className="dropdown" href={`/managers/${manager.id}`} eventKey={4.1}>
            <FontAwesomeIcon icon="user-circle" fixedWidth/>  Dashboard
          </MenuItem>
          {/*<MenuItem className="dropdown" href={`/managers/${manager.id}/settings`} eventKey={4.2}>
            <FontAwesomeIcon icon="cog" fixedWidth/>  Settings 
          </MenuItem> */}
          < MenuItem className="dropdown" onClick={this.props.logoutManager} eventKey={4.3}>
            <FontAwesomeIcon icon="sign-out-alt" fixedWidth/> Logout  
          </MenuItem>
        </NavDropdown>
      </Nav>
      
    )
  }
  render() {
    const { isAuthenticated } = this.props.managerAuth;

    return (
      <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a className="navbar-header" href="/">Shift Buddy Pro </a>
        </Navbar.Brand>  
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {isAuthenticated ? this.managerLinks() : this.publicLinks()}      
      </Navbar.Collapse>
    </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  managerAuth: state.managerAuth,
})


export default connect(mapStateToProps, { logoutManager })(SiteNavbar);
