import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

export class Manager extends Component {
  render() {
    const { manager } = this.props.managerAuth;
    return (
      <Grid className="manager-dashboard">
        <h1>Welcome {manager.name} <img src="//logo.clearbit.com/texaco.com" alt="Company Logo" /></h1> 
        <hr />
        <Row>
          <Col xs={3}>
            <div>
              <h3>Your employees</h3>
            </div>
            <div>
              Recent Shifts: 
            </div>
          </Col>
          <Col xs={9}>
            <h2>Activity Log</h2>
            <div className="log-card">
              Steve just made a drop with envelope # 12 for $300.00.
            </div>
            <div className="log-card">
              Steve just paid "Budweiser" an amount of $524.24 with check #1245.
            </div>
            <div className="log-card">
              Steve just started his shift with $150.69 in his register
            </div>
          </Col>
        </Row>
      </Grid>

    )
  }
}

const mapStateToProps = state => ({
  managerAuth: state.managerAuth,
})


export default connect(mapStateToProps)(Manager)
