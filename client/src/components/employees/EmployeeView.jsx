import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getManagerShifts } from '../../actions/shifts/shiftActions';
import { Grid, Row, Col } from 'react-bootstrap';
import { withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShiftsContainer from '../shifts/ShiftsContainer';


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

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <div className="back-header-container">            
              <div onClick={this.props.history.goBack} className="back"><FontAwesomeIcon icon="chevron-left"/> Back</div>
              <h1 className="shift-page-header">Shifts - {this.props.employees[this.state.employeeId].name}</h1>
            </div>
          </Col>
        </Row>
        <hr />
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              {_.map(this.props.shifts, shift => {
                if (shift.employee === this.state.employeeId)
                return(<a key={shift._id + 'link'} href={`/shifts/${shift._id}`} ><ShiftsContainer key={shift._id + 'container'}  employee={this.props.employees[shift.employee]} shift={shift} /></a>)
                }
              )}
            </Col>
          </Row>
        </Grid>
       

      </div>
    )   
  }
}

const mapStateToProps = ({ shifts, employees, managerAuth }) => ({ shifts, employees, managerId: managerAuth.manager.id })

export default withRouter(connect(mapStateToProps, { getManagerShifts })(EmployeeView))
