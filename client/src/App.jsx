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
import Employees from './components/employees/Employees';
import EmployeeEdit from './components/employees/EmployeeEdit';
import EmployeeCreate from './components/employees/EmployeeCreate';
import Shifts from './components/shifts/Shifts';
import ShiftView from './components/shifts/ShiftView';
import ShiftSettings from './components/shifts/ShiftSettings';
import Landing from './components/public/Landing';
import SiteNavbar from './components/common/SiteNavbar';
import SiteFooter from './components/common/SiteFooter';
import EmployeeView from './components/employees/EmployeeView';
import About from './components/public/About';
import Contact from './components/public/Contact';

// Font 
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
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
            <div className="site-container">
              <SiteNavbar />
              <div className="content-container">
                <Switch>
                  <Route exact path='/'component={Landing} />
                </Switch>  
                <Switch>
                  <Route exact path='/about'component={About} />
                </Switch>  
                <Switch>
                  <Route exact path='/contact'component={Contact} />
                </Switch>  
                <Switch>
                  <Route exact path='/managers/login' component={ManagerLogin} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/managers/:id' component={Manager} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/managers/:id/employees/new' component={EmployeeCreate} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/managers/:id/employees' component={Employees} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/managers/:id/shifts' component={Shifts} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/managers/:id/shifts/settings' component={ShiftSettings} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/shifts/:id' component={ShiftView} />
                </Switch>
                <Switch>
                <Switch>
                  <PrivateRoute exact path='/employees/:id/shifts' component={EmployeeView} />
                </Switch>
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/employees/:id' component={EmployeeEdit} />
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
