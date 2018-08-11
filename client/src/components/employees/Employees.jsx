import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employeeActions'
import { Button } from 'react-bootstrap';

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
            {employees.map(employee => {
              return (
                <div key={employee.id} className="employee-container"> 
                  <div key={employee.id + employee.name} className="header">{employee.name}</div>
                  <Button key={employee.id + employee.name + 'button'} href={`${employee._id}`}>Visit Employee Page</Button>
                </div>
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
