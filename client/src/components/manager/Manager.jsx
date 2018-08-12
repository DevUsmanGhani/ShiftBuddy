import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Manager extends Component {
  render() {
    const { manager } = this.props.managerAuth;
    return (
      <div>
        <h1 className="text-center">Welcome {manager.name} <img src="//logo.clearbit.com/texaco.com" alt="Company Logo" /></h1> 
        <div>Click <a href={`/managers/${manager.id}/employees`}>here</a> to view your employees or create a new one.</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  managerAuth: state.managerAuth,
})


export default connect(mapStateToProps)(Manager)
