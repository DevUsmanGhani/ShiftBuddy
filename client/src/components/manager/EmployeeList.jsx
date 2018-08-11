import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employeeActions'
import { Button } from 'react-bootstrap';

export class EmployeeList extends Component {
  componentWillMount() {
    const { manager } = this.props.managerAuth;
    const api = `http://localhost:5000/api/managers/${manager.id}/employees`;
    this.props.getEmployees(api);
  }
  render() {
      const employeeArray = this.props.employees;
      if(this.props.employees){
        return (
          <div>
            {employeeArray.map(employee => {
              return (
                <li>{employee.name} <Button>Visit Employee Page</Button></li>
              )
            })}
          </div>
        )
      } 
      else{
        return(
          <div>no employees</div>
        )
      }
      
  }
}

const mapStateToProps = (state) => ({
  managerAuth: state.managerAuth,
  employees: state.employees
})

const mapDispatchToProps = {
  getEmployees: getEmployees,
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)
