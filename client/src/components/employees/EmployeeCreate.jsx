import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, Button, Label, Grid, Row, Col } from "react-bootstrap"; 
import { createEmployee } from '../../actions/employeeActions';

class EmployeeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      salary: 0,
      phone: '',
      birthday: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createEmployee(this.props.managerId, this.state, () => this.props.history.push(`/managers/${this.props.managerId}/employees`));
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3} >
            <form onSubmit={this.onSubmit}>
              <h2 className="form-header">New Employee</h2>
              <hr/>  
              <Label>Name: </Label>
              <FormGroup controlId="name" >
                <FormControl
                  autoFocus
                  type="text"
                  name="name"
                  required
                  value={this.state.name}
                  placeholder="Enter Name"
                  onChange={this.onChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              
              <Label>Salary: </Label>
              <FormGroup controlId="salary" >
                <FormControl
                  type="number"
                  name="salary"
                  value={this.state.salary}
                  placeholder="Enter Salary"
                  onChange={this.onChange}
                />
                <FormControl.Feedback />
              </FormGroup>

              <Label>Birthday: </Label>
              <FormGroup controlId="birthday" >
                <FormControl
                  type="date"
                  name="birthday"
                  value={this.state.birthday}
                  placeholder="Enter birthday"
                  onChange={this.onChange}
                />
                <FormControl.Feedback />
              </FormGroup>

              <Label>Phone Number: </Label>
              <FormGroup controlId="phone" >
                <FormControl
                  type="tel"
                  name="phone"
                  value={this.state.phone}
                  placeholder="Enter Phone Number"
                  onChange={this.onChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <Row>
                <div className="center">
                  <Button className="cancel" onClick={this.props.history.goBack} bsSize="large" bsStyle="info">Cancel</Button>
                  <Button className="save" type="submit" bsSize="large" bsStyle="warning">Save</Button>
                </div>
              </Row>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }  
}

const mapStateToProps = (state) => ({
  managerId: state.managerAuth.manager.id
});

export default connect(mapStateToProps, { createEmployee })(EmployeeCreate)
