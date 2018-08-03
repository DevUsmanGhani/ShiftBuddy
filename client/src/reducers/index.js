import { combineReducers } from 'redux';
import managerAuthReducer from './manager/managerAuthReducer';

export default combineReducers({
  managerAuth: managerAuthReducer
});