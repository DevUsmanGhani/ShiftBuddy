import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ManagerLogin extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    const { manager } = this.props.managerAuth.manager;
    return (
      <div>
        <h1 className="text-center">Welcome {manager.name}</h1>
        <div>Click <a href="/employeesList">here</a> to view your employees or create a new one.</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerLogin)
