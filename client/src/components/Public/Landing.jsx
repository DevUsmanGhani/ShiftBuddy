import React, { Component } from 'react';
import { Jumbotron, Button  } from 'react-bootstrap';


/**
 * LandingPage
 */
export class Landing extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Jumbotron className="text-center bg-blue">
        <h2>  
          <div className="tan">Welcome to Shift Buddy!</div>
          <small className="beige">Revolutionizing the way that your business handles shifts</small>
        </h2>
        <hr/>
        <Button className="text-center" bsSize="large" bsStyle="warning">Enter Portal</Button>
      </Jumbotron>
    );
  }
}

export default Landing;
