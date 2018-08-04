import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import  store  from "./store";

// Auth
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentManager, logoutManager } from './actions/manager/managerAuthActions'

// Components
import ManagerLogin from './components/manager/ManagerLogin.jsx';
import Landing from './components/public/Landing';
import SiteNavbar from './components/common/SiteNavbar';
import './App.css';

// Font 
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSignInAlt)

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
    window.location.href = '/managerLogin';
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={ store } >
        <Router>
          <div>
            <SiteNavbar />
            <Route exact path='/'component={Landing} />
            <Route path='/ManagerLogin' component={ManagerLogin} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
