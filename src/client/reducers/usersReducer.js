// Make a reducer to watch for the fetch_users action
// NOTE: import a type with curlies because it is a named export!
import { FETCH_USERS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data;
    default:
      return state;
  }
};
