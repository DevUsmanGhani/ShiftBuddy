import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, managerAuth, ...rest}) => {
    return (
      <Route  
        {...rest}
        render = {props =>
          managerAuth.isAuthenticated === true ? (
            <Component {...props} />
          )
          : (
            <Redirect to='/ManagerLogin' />
          )}
      />
    )
}

const mapStateToProps = (state) => ({
  managerAuth: state.managerAuth

})

export default connect(mapStateToProps)(PrivateRoute)
