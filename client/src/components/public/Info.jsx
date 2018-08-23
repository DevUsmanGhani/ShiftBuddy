import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

export default () => {
  return (
    <div className="info">
      <Row className="header">
        The Future is Now
      </Row>
      <Row className="images-container">
        <Col className="image-container" xs={12} md={6}>
          <Image src="/pile-of-paper.jpg" alt="paper" responsive/>
        </Col>
        <Col className="image-container" xs={12} md={6}>
          <Image src="/notes.jpg" alt="paperwork" responsive/>
        </Col> <br/>
        <Col className="text" xs={10} xsOffset={1}>
          <strong>Forget filing cabinets full of paperwork.</strong> With Shift Buddy Pro, all the data you need is available
          at the touch of a button. Invoices, checks, paidouts, clock-in/clock-out times all consolidated to one place.
          Go back days, weeks, or even months to see exactly the state of your business at any time you need. All 
          from your mobile device or computer.
        </Col>
      </Row>
      <Row>
        
      </Row>
      <Row className="images-container">
        <Col className="image-container" xs={12} md={6}>
          <Image src="/register.jpg" alt="register" responsive/>
        </Col>
        <Col className="image-container" xs={12} md={6}>
          <Image src="/phone.jpg" alt="phone" responsive/>
        </Col>
        <Col className="text" xs={10} xsOffset={1}>
          <strong>Be at your business, even when you're away.</strong> Shift Buddy Pro 
          gives you direct access to the heart of your enterprise from anywhere
          in the world. Know exactly when a check is written or a safe drop is made
          along with all the information you need. Get direct updates from your personnel
          straight from their shift report to your device so you and your business are always 
          connected.
        </Col>
      </Row>  
      <Row>
        
      </Row>  
      <Row className="images-container">
        <Col className="image-container" xs={12} md={6}>
          <Image src="/calculating.jpg" alt="calculating" responsive/>
        </Col>
        <Col className="image-container" xs={12} md={6}>
          <Image src="/viewing.jpg" alt="viewing" responsive/>
        </Col>
        <Col className="text" xs={10} xsOffset={1}>
          <strong>Throw away the calculator.</strong> Shift Buddy Pro does the heavy lifting for you.
          Our application comes packed with a multitude of algorithms that deliver all 
          the information you need without you having to do a single calculation. 
          Open the app and have direct access to daily expenses, items sold, employee work times,
          and much much more. Shift Buddy Pro does the repetitive number crunching for you, so you
          can spend time focusing on the big picture while making pen and paper a thing
          of the past.
        </Col>
      </Row>  
      <Row className="bottom-margin">
        
      </Row>  
    </div>
  )
}
