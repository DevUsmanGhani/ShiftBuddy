import { SET_CURRENT_MANAGER } from '../../actions/manager/types';
import isEmpty from "../../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  manager: {}
};

export default (state = initialState, action) => {
  switch(action.type){
    case SET_CURRENT_MANAGER: {
      console.log(action)
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        manager: action.payload,
      }
    }
    default: 
      return state;
  }
}