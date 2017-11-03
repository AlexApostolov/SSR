// Followup requests use the exact same action creator as the initial page load process by the server,
// but on the browser

// NOTE: If you integrate other APIs you'll need to import axios here and not use the "api" custom axios for those
// NOTE: When app gets bigger create a separate "types" file instead of doing it in here
export const FETCH_USERS = 'fetch_users';
// Use async/await & thunk syntax ("dispatch") for AJAX requests
export const fetchUsers = () => async (dispatch, getState, api) => {
  // URL to the API is inside the customized instance of axios called "api", so we can just append /users
  const res = await api.get('/users');

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};

// Action creator to fetch the current authentication status
export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};
