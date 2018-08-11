import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ManagerLogin extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    const { manager } = this.props.managerAuth;
    return (
      <div>
        <h1 className="text-center">Welcome {manager.name} <img src="//logo.clearbit.com/texaco.com" /></h1> 
        <div>Click <a href="/employeeList">here</a> to view your employees or create a new one.</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  managerAuth: state.managerAuth,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerLogin)
