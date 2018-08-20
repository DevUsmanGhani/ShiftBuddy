import { GET_ERRORS, CLEAR_ERRORS, LOGOUT } from '../actions/types'

const initialState = {};

export default (state=initialState, action) => {
  switch(action.type){
    case GET_ERRORS: 
      return action.payload;
    case CLEAR_ERRORS: 
      return initialState;
    case LOGOUT:
      return initialState;
    default: 
      return state
  }
}