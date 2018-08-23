import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, Button, Label } from "react-bootstrap"; 
import { putEmployee } from '../../actions/employeeActions';
import { Grid, Row, Col } from 'react-bootstrap';

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.employee._id || '',
      name: this.props.employee.name || '',
      salary: this.props.employee.salary || 0,
      phone: this.props.employee.phone || '',
      birthday: this.props.employee.birthday || ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.putEmployee(this.state, () => this.props.history.push(`/managers/${this.props.managerId}/employees`));
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3} >
            <form onSubmit={this.onSubmit}>
              <h2 className="form-header">Edit Employee</h2>
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

const mapStateToProps = (state, ownProps) => ({
  managerId: state.managerAuth.manager.id,
  employee: state.employees[ownProps.match.params.id]
});

export default connect(mapStateToProps, { putEmployee })(EmployeeEdit)
