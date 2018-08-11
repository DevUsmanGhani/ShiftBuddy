import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import  { store, persistor}  from "./store";
import { PersistGate } from 'redux-persist/integration/react'

// Auth
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentManager, logoutManager } from './actions/manager/managerAuthActions'

// Components
import PrivateRoute from './components/common/PrivateRoute';
import ManagerLogin from './components/manager/ManagerLogin';
import Manager from './components/manager/Manager';
import Employees from './components/employees/Employees'
import Landing from './components/public/Landing';
import SiteNavbar from './components/common/SiteNavbar';

// Font 
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import SiteFooter from './components/common/SiteFooter';
library.add(fas)

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentManager(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutManager());
    // Redirect to login
    window.location.href = '/managers/login';
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={ store } >
        <PersistGate loading={ null } persistor={ persistor} >
          <Router>
            <div>
              <SiteNavbar />
              <div className="container">
                <Switch>
                  <Route exact path='/'component={Landing} />
                </Switch>  
                <Switch>
                  <Route exact path='/managers/login' component={ManagerLogin} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/managers/:id' component={Manager} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/managers/:id/employees' component={Employees} />
                </Switch>
              </div>
              <SiteFooter />
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
