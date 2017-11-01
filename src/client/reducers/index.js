// Combine all the different reducers together
import { combineReducers } from 'redux';
import usersReducer from './usersReducer';

export default combineReducers({
  users: usersReducer
});
