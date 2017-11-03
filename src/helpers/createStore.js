// Set up a redux store on the server in this file, rather than in renderer.js
// This is to do initial data loading on the server without attempting to render the app
// Import helpers like inside of client.js, but without the Provider--no rendering remember?
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

// The request object is passed from the catch all route in index.js that includes, among other things, the cookie data
export default req => {
  // During the initial page load process we correctly get the server's action creators
  // to communicate directly with the API, by attaching the browser request's cookie to the server axios' request.

  // Create a new instance of axios with a custom config
  const axiosInstance = axios.create({
    // Unlike client side, no benefit of a proxy here, so full URL
    baseURL: 'http://react-ssr-api.herokuapp.com',
    // Create a custom header to strip off the cookie from the original request and append it to this axios instance,
    // or default to empty string to cover edge case of user making a server request without any cookie
    headers: { cookie: req.get('cookie') || '' }
  });
  const store = createStore(
    reducers,
    {},
    // Get the axios instance to show up in the action creator to trick API into thinking cookie is direct from user
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  // The store will then be created inside the route handler in index.js,
  // then after store initialization, and data loading in it, then store will be passed to renderer
  return store;
};
