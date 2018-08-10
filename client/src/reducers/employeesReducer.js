import { GET_EMPLOYEES } from '../actions/types'
const initialState = [];

export default (state =initialState, action) => {
  switch(action.type){
    case GET_EMPLOYEES :
      return action.payload
    default:
      return state;
  }
}