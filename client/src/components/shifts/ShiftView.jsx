import React, { Component } from 'react';
import { connect } from 'react-redux';
import destructureDate from '../../utils/destructureDate';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PaidOuts from './PaidOuts';
import CashDrops from './CashDrops';
import Checks from './Checks';
import Notes from './Notes';

export class ShiftView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paidOuts: [],
      cashDrops: [],
      checks: [],
      notes: [],
      changeStart: {},
      channgeStop: {},
      inventoryStart: {},
      inventoryStop: {},
    }
  }

  componentWillMount() {
    const { shift } = this.props;
    const api = `/api/shifts/${shift._id}`;
    // Get Paid Outs of this Shift Report
    axios.get(`${api}/paidOuts`)
    .then(res => {
      this.setState({
        paidOuts: res.data,
      })
    })
    .catch(err => console.log(err));
    // Get Safe Drops of this Shift Report
    axios.get(`${api}/cashDrops`)
    .then(res => {
      this.setState({
        cashDrops: res.data,
      })
    })
    .catch(err => console.log(err));
    // Get Checks of this Shift Report
    axios.get(`${api}/checks`)
    .then(res =>{
      this.setState({
        checks: res.data,
      })
    })
    .catch(err => console.log(err));
    // Get Notes of this Shift Report
    axios.get(`${api}/notes`)
    .then(res => this.setState({notes: res.data}))
    .catch(err => console.log(err));
    console.log(shift.inventoryStart);
  }

  render() {
    const { shift } = this.props;
    const { code, year: startYear, month: startMonth, day: startDay, time: startTime } = destructureDate(shift.startTime);
    const { year: endYear, month: endMonth, day: endDay, time: endTime } = destructureDate(shift.endTime);
    const employeeName = this.props.employees[shift.employee].name
    return (
      <div className="shift-view-container">
        <h1 className="shift-name">{code}-{employeeName}</h1>
        <hr />
        <Grid className="shift-report">
          <h2 className="header">Shift Report</h2>
          <Row>
            <Col xs={12} >
              <span>Name: <span className="underline bold">{employeeName}</span></span> 
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              <span>Starting Drawer: <span className="underline bold">${shift.startingCash}</span></span><span className="start-time">Start Time: <span className="underline bold">{startMonth} {startDay} {startYear} {startTime}</span> </span>
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              <span className="end-drawer">Ending Drawer:</span> <span className="underline bold">${shift.endingCash}</span><span className="end-time">End Time: <span className="underline bold">{endMonth} {endDay} {endYear} {endTime}</span> </span>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3}>
                <h3>Safe Drops</h3>
                <CashDrops cashDrops={this.state.cashDrops} />
            </Col>
            <Col xs={12} md={9}>
              <h3>Paid Outs</h3>
              <PaidOuts paidOuts={this.state.paidOuts} />    
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h3>Checks</h3>
              <Checks checks={this.state.checks} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <h3>Inventory</h3>
            </Col>
            <Col xs={12} md={6}>
              <h3>Change</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h3>Notes</h3>
              <Notes notes={this.state.notes} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  shift: state.shifts[ownProps.match.params.id],
  employees: state.employees
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftView)
