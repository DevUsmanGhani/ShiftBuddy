import React, { Component } from 'react'
import { connect } from 'react-redux';
import shiftsDataReducer from '../../reducers/shiftsDataReducer';
class ShiftSettings extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shiftSettings: shiftsDataReducer.settings
})

export default connect(mapStateToProps)(ShiftSettings);
