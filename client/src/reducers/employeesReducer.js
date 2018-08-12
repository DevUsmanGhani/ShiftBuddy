import _ from 'lodash';
import { GET_EMPLOYEES, PUT_EMPLOYEE, LOGOUT } from '../actions/types'
const initialState = {};

export default (state = initialState, action) => {
  switch(action.type){
    case GET_EMPLOYEES:
      return _.mapKeys(action.payload, '_id');
    case PUT_EMPLOYEE:
      return {...state, [action.payload._id]: action.payload};
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}