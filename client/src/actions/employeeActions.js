import axios from 'axios';
import { GET_EMPLOYEES, PUT_EMPLOYEE, DELETE_EMPLOYEE } from './types';

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

export const putEmployee = (employee, callback) => dispatch => {
  axios.put(`http://localhost:5000/api/employees/${employee._id}`, employee)
  .then(res => {
    dispatch({
      type: PUT_EMPLOYEE,
      payload: employee
    })
  })
    .then(() => callback())
  .catch(err => {
    console.log(err);
  });
}

export const deleteEmployee = (id, callback) => dispatch => {
  axios.delete(`http://localhost:5000/api/employees/${id}`)
  .then(() => {
    dispatch({
      type: DELETE_EMPLOYEE,
      payload: id
    })
  })
  .catch(err => {
    console.log(err);
  })
}
