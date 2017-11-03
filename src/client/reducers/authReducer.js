import { FETCH_CURRENT_USER } from '../actions';

// Start authentication state as null, because we do not yet know if user is authenticated
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      // If user is not authenitcated default to false because data would be undefined
      return action.payload.data || false;
    default:
      return state;
  }
}
