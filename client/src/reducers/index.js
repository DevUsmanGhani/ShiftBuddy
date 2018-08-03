import { combineReducers } from 'redux';
import managerAuthReducer from './manager/managerAuthReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  managerAuth: managerAuthReducer,
  error: errorReducer
});