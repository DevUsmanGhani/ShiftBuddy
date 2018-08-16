import { GET_MANAGER_SHIFTS } from "../actions/types";
import _ from 'lodash';

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MANAGER_SHIFTS:
      return _.mapKeys(action.payload, '_id');
    default:
      return state
  }
}
