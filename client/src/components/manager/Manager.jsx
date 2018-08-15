import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

export class Manager extends Component {
  render() {
    const { manager } = this.props.managerAuth;
    const { employees } = this.props;
    let i = 0;
    return (
      <Grid className="manager-dashboard">
        <h1>Welcome {manager.name} <img src="//logo.clearbit.com/texaco.com" alt="Company Logo" /></h1> 
        <hr />
        <Row>
          <Col xsHidden sm={3} lg={2} className="side-box">
            <div className="employees-box">
              <h4 className="employees-header">Your Employees </h4>
              
              {_.map(employees, employee => {
                if(i < 3){
                  i++;
                  return(
                    <a key={employee._id + 'dashboard'} className="employees-name" href={`/managers/${manager.id}/employees/${employee._id}`}>{employee.name}</a>
                  )}
                })
              }
              <a href={`/managers/${manager.id}/employees`} className="view-all">View All</a>
            </div>
            <div className="shifts-box">
              <h4 className="shifts-header">Recent Shifts:</h4> 
              <a className="shifts-name">08/15-B</a>
              <a className="shifts-name">08/15-A</a>
              <a className="shifts-name">08/14-C</a>
              <a className="view-all">View all</a>
            </div>
          </Col>
          <Col xs={12} sm={9} lg={10}>
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
  employees: state.employees,
})


export default connect(mapStateToProps)(Manager)
