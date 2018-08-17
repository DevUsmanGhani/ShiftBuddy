import React from 'react';
import destructureDate from '../../utils/destructureDate';
import { Row, Col } from 'react-bootstrap';

export default ({shift, employee}) => {
  const { code, year: startYear, month: startMonth, day: startDay, time: startTime } = destructureDate(shift.startTime);
  const { year: endYear, month: endMonth, day: endDay, time: endTime } = destructureDate(shift.endTime);
  return (
    <Row className="shifts-container">
      <Col  xsPush={5} smPush={0} sm={3} className="name" >{code} - {employee.name}</Col>
      <Col  xsHidden sm={9} smPush={2} className="time">{startMonth} {startDay} {startYear} {startTime} &rarr; {endMonth} {endDay} {endYear} {endTime}</Col>
    </Row>
  )
}
