import axios from 'axios';
import { GET_MANAGER_SHIFTS } from '../types';

export const getManagerShifts = (mid) => dispatch => {
  axios.get(`/api/managers/${mid}/shifts`)
  .then(res => {
    dispatch({
      type: GET_MANAGER_SHIFTS,
      payload: res.data
    })
  })
  .catch(err => {
  });
}
