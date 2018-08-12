import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employeeActions'
import { Grid, Row, Col } from 'react-bootstrap';

export class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
        managerId: this.props.match.params.id,
      }
  }
  componentWillMount() {
    const api = `http://localhost:5000/api/managers/${this.state.managerId}/employees`;
    this.props.getEmployees(api);
  }
  render() {
      const { employees } = this.props;
      if(employees){
        return (
          <div>
            <h1>Employees</h1>
            <hr />
            {_.map(this.props.employees, employee => {
              return (
                <Grid>
                  <Row key={employee._id} className="employee-container"> 
                    <Col
                      className="employee-header"
                      xs={4} 
                      key={employee._id + employee.name}>
                      {employee.name}
                    </Col>
                    <Col
                      className="view-button"
                      xs={3} 
                      key={employee._id + employee.name + 'button'} 
                      href={`/employees/${employee._id}`}
                    >
                      View
                    </Col>
                    <Col
                      className="edit-button"
                      xs={3} 
                      key={employee._id + employee.name + 'button'} 
                      href={`/employees/${employee._id}`}
                    >
                      Edit
                    </Col>
                    <Col
                      className="delete-button"
                      xs={2} 
                      key={employee._id + employee.name + 'button'} 
                      href={`/employees/${employee._id}`}
                    >
                      Delete
                    </Col>
                  </Row>
                </Grid>
                
              )
            })}  
          </div>
        )
      } 
      else{
        return(
          <div>You don't have any employees added.</div>
        )
      }    
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees
})

const mapDispatchToProps = {
  getEmployees: getEmployees,
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees)
