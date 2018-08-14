import { GET_INVENTORY_SETTINGS } from "../actions/shifts/types";

const initialState = {
  shifts: {},
  inventoryItems: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY_SETTINGS:
      return { ...state, inventoryItems: action.payload }
    default:
      return state
  }
}
