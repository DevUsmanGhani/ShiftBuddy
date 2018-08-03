import React, { Component } from 'react'
import { FormGroup, FormControl, Button } from "react-bootstrap"; 
import { connect } from 'react-redux';
import { loginManager } from '../../actions/manager/managerAuthActions';

export class ManagerLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    
    this.onChange = this.onChange.bind(this);
    this.attemptSignIn = this.attemptSignIn.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  attemptSignIn() {
    
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.attemptSignIn}>
        <FormGroup controlId="email">
          <FormControl
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.onChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="password">
          <FormControl
            type="password"
            name="password"
            value={this.state.pasword}
            placeholder="Enter pasword"
          />
          <FormControl.Feedback />
        </FormGroup>

        <Button type="submit">Sign in</Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})


export default connect(mapStateToProps, { loginUser })(ManagerLogin);
