import React, { Component } from 'react';
import { Jumbotron, Button  } from 'react-bootstrap';


/**
 * LandingPage
 */
export class Landing extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Jumbotron className="text-center bg-silver">
        <h2>  
          <div className="blue">Shift Buddy Pro</div>
          <small className="tan">Revolutionizing the way that your business handles shifts</small>
        </h2>
        <hr/>
        <Button className="text-center" bsSize="large" bsStyle="info" href="/managerlogin">Enter Portal</Button>
      </Jumbotron>
    );
  }
}

export default Landing;
