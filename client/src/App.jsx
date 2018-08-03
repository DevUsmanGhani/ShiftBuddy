import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import  store  from "./store";

// Components
import ManagerLogin from './components/manager/ManagerLogin.jsx';
import Landing from './components/public/Landing';
import SiteNavbar from './components/common/SiteNavbar';
import './App.css';

// Font 
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faSignInAlt)



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
