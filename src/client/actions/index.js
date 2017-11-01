import axios from 'axios';
// When app gets bigger create a separate "types" file instead of doing it in here
export const FETCH_USERS = 'fetch_users';
// Use async/await & thunk syntax ("dispatch") for AJAX requests
export const fetchUsers = () => async dispatch => {
  // URL to the API
  const res = await axios.get('https://react-ssr-api.herokuapp.com/users');

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};
