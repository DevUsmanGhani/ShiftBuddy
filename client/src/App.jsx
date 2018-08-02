import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1>
            Welcome to Shift Buddy!
          </h1>
          <span>Revolutionizing the way that your business handles shifts</span>
          <hr />
          <Button bsSize="large" bsStyle="info">Register Today</Button>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
