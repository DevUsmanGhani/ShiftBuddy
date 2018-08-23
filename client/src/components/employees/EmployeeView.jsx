import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getManagerShifts } from '../../actions/shifts/shiftActions';
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShiftsContainer from '../shifts/ShiftsContainer';
import destructureDate from '../../utils/destructureDate';
import formatMoney from '../../utils/formatMoney';


export class EmployeeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        employeeId: this.props.match.params.id,
      }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(shiftId) {
    this.props.history.push(`/shifts/${shiftId}`);
  }
  componentWillMount() {
    this.props.getManagerShifts(this.props.managerId);
  }
  employeeBirthday() {
    const employee = this.props.employees[this.state.employeeId]
    if(employee.birthday) {
      const { day, month, year } = destructureDate(employee.birthday)
      return (
        <div>{month} {day}, {year}</div>
      )
    }
  }

  render() {
    const employee = this.props.employees[this.state.employeeId]
    return (
      <Grid className="employee-view">
        <Row>
          <Col xs={12}>
            <div className="back-header-container">            
              <div onClick={this.props.history.goBack} className="back"><FontAwesomeIcon icon="chevron-left"/> Back</div>
              <h1 className="shift-page-header">{this.props.employees[this.state.employeeId].name}</h1>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="employee-info" xs={12} md={2}>
            <div className="profile-picture-container"><img className="profile-picture" src="/blank-profile-picture.png" alt="profile"/> <br /></div>
            <div>{employee.name}</div>
             <div>${formatMoney(employee.salary)}/hr</div>
             {this.employeeBirthday()}
          </Col>
          <Col xs={12} md={10}>
          {_.map(this.props.shifts, shift => {
                if (shift.employee === this.state.employeeId)
                return(<a key={shift._id + 'link'} href={`/shifts/${shift._id}`} ><ShiftsContainer key={shift._id + 'container'}  employee={this.props.employees[shift.employee]} shift={shift} /></a>)
                }
              )}
          </Col>
        </Row>              
        
       

      </Grid>
    )   
  }
}

const mapStateToProps = ({ shifts, employees, managerAuth }) => ({ shifts, employees, managerId: managerAuth.manager.id })

export default withRouter(connect(mapStateToProps, { getManagerShifts })(EmployeeView))
