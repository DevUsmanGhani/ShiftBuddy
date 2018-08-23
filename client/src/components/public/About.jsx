import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

export default () => {
  return (
    <Grid className="about-us">
      <Row className="header">
        <span className="underline">Welcome to Shift Buddy Pro</span><br/>
        <small>Our goal is to plunge small businesses into the future</small>
      </Row>
      <Row className="images-container">
        <Col className="image-container" xs={12} md={6}>
          <Image src="/pile-of-paper.jpg" alt="paper" responsive/>
        </Col>
        <Col className="image-container" xs={12} md={6}>
          <Image src="/notes.jpg" alt="paperwork" responsive/>
        </Col>
      </Row>
      <Row>
        <Col className="text" xs={10} xsOffset={1}>
          Forget filing cabinets full of paperwork. With Shift Buddy Pro, all the data you need is available
          at the touch of a button. Invoices, checks, paidouts, clock-in/clock-out times all consolidated to one place.
          Go back days, weeks, or even months to see exactly the state of your business at any time you need. All 
          from your mobile device or computer.
        </Col>
      </Row>
      <Row className="images-container">
        <Col className="image-container" xs={12} md={6}>
          <Image src="/register.jpg" alt="register" responsive/>
        </Col>
        <Col className="image-container" xs={12} md={6}>
          <Image src="/phone.jpg" alt="phone" responsive/>
        </Col>
      </Row>  
      <Row>
        <Col className="text" xs={10} xsOffset={1}>
          Be at your business, even when you're away. Shift Buddy Pro 
          gives you direct access to the heart of your enterprise from anywhere
          in the world. Know exactly when a check is written or a safe drop is made
          along with all the information you need. Get direct updates from your personnel
          straight from their shift report to your device so you and your business are always 
          connected.
        </Col>
      </Row>  
    </Grid>
  )
}
