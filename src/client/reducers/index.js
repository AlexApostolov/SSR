// Combine all the different reducers together
import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';

export default combineReducers({
  // "users" & "auth" piece of state
  users: usersReducer,
  auth: authReducer,
  admins: adminsReducer
});
