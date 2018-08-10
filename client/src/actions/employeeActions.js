import axios from 'axios';
import { GET_EMPLOYEES } from './types';

export const getEmployees = (api) => dispatch => {
  axios.get(api)
  .then(res => {
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data
    })
  })
  .catch(err => {
  });
  
}