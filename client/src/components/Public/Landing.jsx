import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';


/**
 * LandingPage
 */
export class Landing extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Jumbotron>
        <h1>
          Welcome to Shift Buddy!
        </h1>
        <span>Revolutionizing the way that your business handles shifts</span>
        <hr />
        <Button bsSize="large" bsStyle="info">Register Today</Button>
      </Jumbotron>
    );
  }
}

export default Landing;
