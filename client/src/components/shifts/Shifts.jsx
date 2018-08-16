import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getManagerShifts } from '../../actions/shifts/shiftActions';
import { Button } from 'react-bootstrap';
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
  }
  handleClick(type, employeeId) {
    switch(type) {
      case 'settings':  return this.props.history.push(`/managers/${this.state.managerId}/shifts/settings`);
      case 'view': return this.props.history.push(`/employees/${employeeId}`); 
      default: return;
    }
  }
  componentWillMount() {
    this.props.getManagerShifts(this.state.managerId);
  }
  render() {
    return (
      <div>
        <h1 className="shift-page-header">Shifts <Button onClick={() => this.handleClick('settings', null)} className="shift-settings-button" bsSize="large" ><FontAwesomeIcon className="good" icon="cog"/></Button></h1>
        <hr />
        {_.map(this.props.shifts, shift => {
          return(<ShiftsContainer shift={shift} />)
          }
        )}

      </div>
    )   
  }
}

const mapStateToProps = ({ shifts }) => ({ shifts })

export default withRouter(connect(mapStateToProps, { getManagerShifts })(Shifts))
