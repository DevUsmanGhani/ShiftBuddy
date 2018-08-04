import React, { Component } from 'react'
import { FormGroup, FormControl, Button, Alert } from "react-bootstrap"; 
import { connect } from 'react-redux';
import { loginManager } from '../../actions/manager/managerAuthActions';

export class ManagerLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loginAttempts: 0,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    console.log("coomponent mounted")
    if(this.props.managerAuth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    if(nextProps.managerAuth.isAuthenticated) {
      this.props.history.push('/');
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        loginAttempts: this.state.loginAttempts + 1,
      })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.props.managerAuth)
  }

  onSubmit(e) {
    e.preventDefault();
    const managerData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginManager(managerData);
  }

  renderErrors() {
    if(this.state.errors) {
      return (
        <Alert>

        </Alert>
      )
    }
  }

  render() {

    return (
      <form onSubmit={this.onSubmit}>
        
        <FormGroup controlId="email" >
          <FormControl
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.onChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="password" >
          <FormControl
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Enter pasword"
            onChange={this.onChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <Button type="submit">Sign in</Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  managerAuth: state.managerAuth,
  errors: state.errors
})


export default connect(mapStateToProps, { loginManager })(ManagerLogin);
