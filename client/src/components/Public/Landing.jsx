import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Button  } from 'react-bootstrap';


export class Landing extends Component { 
  componentDidMount() {
    if(this.props.managerAuth.isAuthenticated) {
      this.props.history.push(`/managers/${this.props.managerAuth.manager.id}`);
    }
  }
  render() {
    return (
      <Jumbotron className="text-center bg-silver">
        <h2>  
          <div className="blue">Shift Buddy Pro</div>
          <small className="orange">Revolutionizing the way that your business handles shifts</small>
        </h2>
        <hr/>
        <Button className="text-center" bsSize="large" bsStyle="info" href="/managers/login">Enter Portal</Button>
      </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => ({
  managerAuth: state.managerAuth,
})


export default connect(mapStateToProps)(Landing)
