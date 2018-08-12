import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_MANAGER, GET_ERRORS, LOGOUT} from './types';

// Login - Get Manager Token
export const loginManager = (managerData, callback) => dispatch => {
  axios
  .post('/api/managers/login', managerData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      // Set token to local storage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode token to get Manager Data
      const decodedToken = jwt_decode(token);
      // Set Current Manager
      dispatch(setCurrentManager(decodedToken));
    })
      .then(() => callback())
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  })
}

// Set logged in manager
export const setCurrentManager = decodedToken => {
  return {
    type: SET_CURRENT_MANAGER,
    payload: decodedToken
  }
}

// Logout - Delete manager token
export const logoutManager = () => dispatch => {
  localStorage.clear();
  dispatch({
    type: LOGOUT,
    payload: {},
  })
}



