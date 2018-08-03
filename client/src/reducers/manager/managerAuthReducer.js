import { SET_CURRENT_USER } from '../../actions/manager/types';
import isEmpty from "../../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  manager: {}
};

export default (state = initialState, action) => {
  switch(action.type){
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}