import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employeeActions'
import { Button } from 'react-bootstrap';

export class Employees extends Component {
  componentWillMount() {
    const { manager } = this.props.managerAuth;
    const api = `http://localhost:5000/api/managers/${manager.id}/employees`;
    this.props.getEmployees(api);
  }
  render() {
      const { employees } = this.props
      if(employees){
        return (
          <div>
            <h1>Employees</h1>
            <hr />
            {employees.map(employee => {
              return (
                <div class="employee-container"> 
                  <div className="header">{employee.name}</div>
                  <Button>Visit Employee Page</Button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Employees)
