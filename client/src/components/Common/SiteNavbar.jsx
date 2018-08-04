import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from "react-redux";
import { logoutManager } from '../../actions/manager/managerAuthActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class SiteNavbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: this.props.managerAuth.isAuthenticated
    }
  }

  loginButton() {
    return (
      <NavItem  eventKey={3} href="/managerlogin">
        Login <FontAwesomeIcon icon="sign-in-alt" /> 
      </NavItem>
    )
  }

  logoutButton() {
    return (
      <NavItem onClick={this.props.logoutManager} eventKey={4} href="/">
        Logout <FontAwesomeIcon icon="sign-out-alt" /> 
      </NavItem>
    )
  }
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
            About Us
          </NavItem>
          <NavItem eventKey={2} href="#">
            Contact 
          </NavItem>
          {this.state.isLoggedIn ? this.logoutButton() : this.loginButton()}      
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
