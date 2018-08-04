import { combineReducers } from 'redux';
import managerAuthReducer from './manager/managerAuthReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  managerAuth: managerAuthReducer,
  errors: errorsReducer
});