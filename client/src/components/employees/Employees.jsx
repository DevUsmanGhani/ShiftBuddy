import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employeeActions'
import { Grid, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter} from 'react-router-dom';

export class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
        managerId: this.props.match.params.id,
      }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(type, employeeId) {
    switch(type) {
      case 'edit': return this.props.history.push(`/employees/${employeeId}`); 
      default: return;
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
                <Grid key={employee._id + 'grid'}>
                  <Row key={employee._id + 'row'} className="employee-container"> 
                    <Col
                      className="employee-header"
                      xs={4} 
                      key={employee._id + 'name'}>
                      {employee.name}
                    </Col>
                    <Col
                      className="view-button"
                      xs={3} 
                      key={employee._id + 'view'} 
                    >
                      View <FontAwesomeIcon icon="address-card" fixedWidth/>
                    </Col>
                    <Col
                      className="edit-button"
                      xs={3} 
                      key={employee._id + 'edit'} 
                      onClick={() => this.handleClick('edit', employee._id)}
                    >
                      Edit <FontAwesomeIcon icon="edit" fixedWidth/>
                    </Col>
                    <Col
                      className="delete-button"
                      xs={2} 
                      key={employee._id + 'delete'} 
                    >
                      <FontAwesomeIcon icon="times" fixedWidth/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Employees))
