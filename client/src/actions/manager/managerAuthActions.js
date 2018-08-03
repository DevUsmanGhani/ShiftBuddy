import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_MANAGER } from './types';

// Login - Get Manager Token
export const loginManager = managerData => dispatch => {
  axios.post('/api/managers/login', managerData)
  .then(res => {
    // Save to local storage
    const { token } = res.data;
    // Set token to local storage
    localStorage.setItem('jwtToken', token);
    // Set token to Auth Header
    setAuthToken(token);
    // Decode token to get Manager Data
    const decodedToken = decode(token);
    // Set Current Manager
    dispatch(setCurrentManager(decoded));
  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Set logged in manager
export const setCurrentManager = decodedToken => {
  return {
    type: SET_CURRENT_MANAGER,
    payload: decodedToken
  }
}
