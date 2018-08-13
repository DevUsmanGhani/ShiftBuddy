import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, deleteEmployee } from '../../actions/employeeActions'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter} from 'react-router-dom';
import Popup from 'reactjs-popup';


export class Shifts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        managerId: this.props.match.params.id,
      }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(type, employeeId) {
    switch(type) {
      case 'settings':  return this.props.history.push(`/managers/${this.state.managerId}/shifts/settings`);
      case 'view': return this.props.history.push(`/employees/${employeeId}`); 
      default: return;
    }
  }
  // componentWillMount() {
  //   const api = `http://localhost:5000/api/managers/${this.state.managerId}/employees`;
  //   this.props.getEmployees(api);
  // }
  render() {
    return (
      <div>
        <h1 className="shift-page-header">Shifts <Button onClick={() => this.handleClick('settings', null)} className="shift-settings-button" bsSize="large" ><FontAwesomeIcon className="good" icon="cog"/></Button></h1>
        <hr />
      </div>
    )   
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees
})

const mapDispatchToProps = {
  getEmployees: getEmployees,
  deleteEmployee: deleteEmployee,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Shifts))
