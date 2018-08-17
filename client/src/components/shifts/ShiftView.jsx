import React, { Component } from 'react';
import { connect } from 'react-redux';
import destructureDate from '../../utils/destructureDate';
import { Grid, Row, Col } from 'react-bootstrap';

export class ShiftView extends Component {

  render() {
    const { shift } = this.props;
    const { code, year: startYear, month: startMonth, day: startDay, time: startTime } = destructureDate(shift.startTime);
    const { year: endYear, month: endMonth, day: endDay, time: endTime } = destructureDate(shift.endTime);
    return (
      <div className="shift-view-container">
        <h1>Shift: <span className="shift-name">Steven-{code}</span></h1>
        <hr />
        <Grid className="shift-report">
          <Row>
            <Col md={10} mdOffset={1}>
              <span>Name: <span className="underline bold">Steven</span></span> <span className="start-time">Start Time: <span className="underline bold">{startMonth} {startDay} {startYear} {startTime}</span> </span>
            </Col>
            <Col md={10} mdOffset={1}>
            <span className="end-time">End Time: <span className="underline bold">{endMonth} {endDay} {endYear} {endTime}</span> </span>
            </Col>
            <Col md={10} mdOffset={1}>
              
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  shift: state.shifts[ownProps.match.params.id]
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftView)
