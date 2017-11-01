// Set up a redux store on the server in this file, rather than in renderer.js
// This is to do initial data loading on the server without attempting to render the app
// Import helpers like inside of client.js, but without the Provider--no rendering remember?
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  // The store will then be created inside the route handler in index.js,
  // then after store initialization, and data loading in it, then store will be passed to renderer
  return store;
};
