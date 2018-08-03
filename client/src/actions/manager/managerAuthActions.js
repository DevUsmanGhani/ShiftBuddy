import axios from 'axios';
import { GET_ERRORS } from './types';

// Login - Get Manager Token
export const loginManager = managerData => dispatch => {
  axios.post('/api/managers/login', managerData)
  .then(res => {

  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
