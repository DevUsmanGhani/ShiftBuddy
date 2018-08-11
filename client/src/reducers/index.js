import { combineReducers } from 'redux';
import managerAuthReducer from './managerAuthReducer';
import errorsReducer from './errorsReducer';
import employeesReducer from './employeesReducer';

export default combineReducers({
  managerAuth: managerAuthReducer,
  errors: errorsReducer,
  employees: employeesReducer,
});
