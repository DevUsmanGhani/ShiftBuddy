import _ from 'lodash';
import { GET_MANAGER_SHIFTS, LOGOUT } from "../actions/types";

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MANAGER_SHIFTS:
      return _.mapKeys(action.payload, '_id');
    case LOGOUT:
      return initialState;
    default:
      return state
  }
}
