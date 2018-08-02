import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ManagerLogin from './components/Manager/ManagerLogin.jsx';
import Landing from './components/Public/Landing';
import SiteNavbar from './components/Common/SiteNavbar';
import './App.css';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
library.add(faStroopwafel)


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <SiteNavbar />
          <div>
            <Route exact path='/'component={Landing} />
            <Route path='/ManagerLogin' component={ManagerLogin} />
          </div>
        </div>
        
      </Router>
    );
  }
}

export default App;
