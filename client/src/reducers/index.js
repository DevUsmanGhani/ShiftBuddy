import { combineReducers } from 'redux';
import managerAuthReducer from './managerAuthReducer';
import errorsReducer from './errorsReducer';
import employeesReducer from './employeesReducer';
import shiftsDataReducer from './shiftsDataReducer';
import shiftsReducer from './shiftsReducer';

export default combineReducers({
  managerAuth: managerAuthReducer,
  errors: errorsReducer,
  employees: employeesReducer,
  shiftsData: shiftsDataReducer,
  shifts: shiftsReducer
});
