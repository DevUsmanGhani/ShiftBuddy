import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getManagerShifts } from '../../actions/shifts/shiftActions';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter} from 'react-router-dom';
import ShiftsContainer from './ShiftsContainer';


export class Shifts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        managerId: this.props.match.params.id,
      }
    this.handleClick = this.handleClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
  }
  handleClick(shiftId) {
    this.props.history.push(`/shifts/${shiftId}`);
  }
  handleSettingsClick() {
    this.props.history.push('shifts/settings');
  }
  componentWillMount() {
    this.props.getManagerShifts(this.state.managerId);
  }
  render() {
    return (
      <div>
        <h1 className="shift-page-header">Shifts <Button onClick={this.handleSettingsClick} className="shift-settings-button" bsSize="large" ><FontAwesomeIcon className="good" icon="cog"/></Button></h1>
        <hr />
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              {_.map(this.props.shifts, shift => {
                return(<a key={shift._id + 'link'} href={`/shifts/${shift._id}`} ><ShiftsContainer key={shift._id + 'container'}  employee={this.props.employees[shift.employee]} shift={shift} /></a>)
                }
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    )   
  }
}

const mapStateToProps = ({ shifts, employees }) => ({ shifts, employees })

export default withRouter(connect(mapStateToProps, { getManagerShifts })(Shifts))
