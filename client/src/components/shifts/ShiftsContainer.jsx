import React, { Component } from 'react';
import destructureDate from '../../utils/destructureDate';
import { Row, Col } from 'react-bootstrap';
export default class ShiftsContainer extends Component {

  makeShift() {
    if (this.props.employee) {
      const { code, year: startYear, month: startMonth, day: startDay, time: startTime } = destructureDate(this.props.shift.startTime);
      const { year: endYear, month: endMonth, day: endDay, time: endTime } = destructureDate(this.props.shift.endTime);
      return (
        <Row className="shifts-container">
          <Col  xsPush={5} smPush={0} sm={3} className="name" >{code} - {this.props.employee.name}</Col>
          <Col  xsHidden sm={9} smPush={2} className="time">{startMonth} {startDay} {startYear} {startTime} &rarr; {endMonth} {endDay} {endYear} {endTime}</Col>
        </Row>
      )
    }
  }

  render() {
    return (
      <div>
        {this.makeShift()}
      </div>
    )
  }
}

