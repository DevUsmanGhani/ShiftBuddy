import React, { Component } from 'react';
import { connect } from 'react-redux';
import destructureDate from '../../utils/destructureDate';
import { Grid, Row, Col } from 'react-bootstrap';

export class ShiftView extends Component {

  render() {
    const { shift } = this.props;
    const { code, year: startYear, month: startMonth, day: startDay, time: startTime } = destructureDate(shift.startTime);
    const { year: endYear, month: endMonth, day: endDay, time: endTime } = destructureDate(shift.endTime);
    const employeeName = this.props.employees[shift.employee].name
    return (
      <div className="shift-view-container">
        <h1>Shift: <span className="shift-name">{employeeName}-{code}</span></h1>
        <hr />
        <Grid className="shift-report">
          <h2 className="header">Shift Report</h2>
          <Row>
            <Col xs={12} >
              <span>Name: <span className="underline bold">{employeeName}</span></span> <span className="start-time">Start Time: <span className="underline bold">{startMonth} {startDay} {startYear} {startTime}</span> </span>
            </Col>
            <Col xs={12} >
              <span className="end-time">End Time: <span className="underline bold">{endMonth} {endDay} {endYear} {endTime}</span> </span>
            </Col>
            <Col xs={12} >
              <span className="start-drawer">Starting Drawer: <span className="underline bold"></span></span><span className="end-drawer">Ending Drawer: $<span className="underline bold">150.00</span></span>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  shift: state.shifts[ownProps.match.params.id],
  employees: state.employees
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftView)
