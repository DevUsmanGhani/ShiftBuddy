import { GET_INVENTORY_SETTINGS } from "../actions/shifts/types";

const initialState = {
  shifts: {},
  settings: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY_SETTINGS:
      return { ...state }
    default:
      return state
  }
}
