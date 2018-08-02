import React, { Component } from 'react'
import { ControlLabel, FormGroup, HelpBlock, FormControl, Button } from "react-bootstrap"; 

export class ManagerLogin extends Component {
  constructor(props, context) {
    super(props, context)
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.attemptSignIn = this.attemptSignIn.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  onEmailChange(email) {
    this.setState({ email: email.target.value });
  }

  onPassordChange(password) {
    this.setState({ password: password.target.value });
  }

  render() {
    return (
      <form onSubmit={this.attemptSignIn}>
        <FormGroup controlId="email">
          <FormControl
            type="email"
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.onEmailChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="password">
          <FormControl
            type="password"
            value={this.state.pasword}
            placeholder="Enter pasword"
            onChange={this.onPasswordChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <Button type="submit">Sign in</Button>
      </form>
    );
  }
}

export default ManagerLogin;
