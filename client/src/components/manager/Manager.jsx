import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Manager extends Component {
  render() {
    const { manager } = this.props.managerAuth;
    return (
      <div>
        <h1>Welcome {manager.name} <img src="//logo.clearbit.com/texaco.com" alt="Company Logo" /></h1> 
        <hr />
        

      </div>
    )
  }
}

const mapStateToProps = state => ({
  managerAuth: state.managerAuth,
})


export default connect(mapStateToProps)(Manager)
