import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, deleteEmployee } from '../../actions/employeeActions'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter} from 'react-router-dom';
import Popup from 'reactjs-popup';


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
      case 'new':  return this.props.history.push('employees/new');
      case 'edit': return this.props.history.push(`/employees/${employeeId}`); 
      case 'view': return this.props.history.push(`/employees/${employeeId}/shifts`)
      case 'delete' : {
        this.props.deleteEmployee(employeeId);
        window.location.reload();
        break;
      } 
      default: return;
    }
  }
  componentWillMount() {
    const api = `/api/managers/${this.state.managerId}/employees`;
    this.props.getEmployees(api);
  }
  render() {
      const { employees } = this.props;
      if(employees){
        return (
          <div>
            <h1 className="employee-page-header">Employees <Button onClick={() => this.handleClick('new', null)} className="add-employee-button" bsSize="large" ><FontAwesomeIcon className="good" icon="plus"/></Button></h1>
            <hr />
            {_.map(employees, employee => {
              if(employee) {
                return (
                  <Grid key={employee._id + 'grid'}>
                    <Row key={employee._id + 'row'} className="employee-container"> 
                      <Col
                        className="employee-header"
                        xs={4} 
                        key={employee._id + 'name'}>
                        {employee.name || <div className="loading"></div>}
                      </Col>
                      <Col
                        className="view-button"
                        xs={3} 
                        key={employee._id + 'view'} 
                        onClick={() => this.handleClick('view', employee._id)}
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
                      <Popup 
                        modal
                        trigger={ 
                          <Col
                          className="delete-button"
                          xs={2} 
                          key={employee._id + 'delete'} 
                          > 
                            <FontAwesomeIcon icon="times" fixedWidth/>
                          </Col> 
                          }
                      >
                        {close => (
                          <div className="popup">
                            <h3 className="popup-header">Confirm Deletion</h3>
                            <div>Deletion will remove all information about this employee. This cannot be undone.</div>
                            <div>
                              <span onClick={close} className="popup-close">Cancel</span>
                              <span onClick={() => this.handleClick('delete', employee._id)} className="popup-delete">Delete</span>
                            </div>
                          </div>
                        )} 
                      </Popup> 
                    </Row>
                  </Grid> 
                )}
                else{
                  return null;
                }   
              }
            )}  
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
  deleteEmployee: deleteEmployee
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Employees))
