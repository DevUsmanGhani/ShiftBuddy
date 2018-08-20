import _ from 'lodash';
import { GET_INVENTORY_SETTINGS, ADD_INVENTORY_ITEM, DELETE_INVENTORY_ITEM } from "../actions/shifts/types";
import { LOGOUT } from "../actions/types";

const initialState = {
  inventoryItems: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY_SETTINGS:
      return { ...state, inventoryItems: _.mapKeys(action.payload, '_id') }
    case ADD_INVENTORY_ITEM:
      return { ...state, inventoryItems: {...state.inventoryItems, [action.payload._id]: action.payload} };
    case DELETE_INVENTORY_ITEM:
      return { ...state, inventoryItems: _.omit(state.inventoryItems, action.payload)}
    case LOGOUT: 
      return initialState;
    default:
      return state
  }
}
