import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getInventorySettings } from '../../actions/shifts/shiftsActions';
class ShiftSettings extends Component {
  componentDidMount() {
    const managerId = this.props.match.params.id;
    this.props.getInventorySettings(`/api/managers/${managerId}`)
  }

  render() {
    console.log(this.props.shiftSettings);
    return (
      <div>
        hi!
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  shiftSettings: state.shiftsData
})

export default connect(mapStateToProps, { getInventorySettings })(ShiftSettings);
