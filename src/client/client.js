// Startup point for the client side application

// Execute module and polyfill async/await syntax for babel
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// For the client side version of the redux store: create a store, hook up middleware,
import { createStore, applyMiddleware } from 'redux';
// handle async action creators,
import thunk from 'redux-thunk';
// and tie the store with any connected react components
import { Provider } from 'react-redux';
// Figure out what components would have rendered based on URL
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

// Create a new instance of axios with a custom config
const axiosInstance = axios.create({
  // Automatically prepend /api onto the URL the request is made to,
  // which means it would be automatically proxied
  baseURL: '/api'
});

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  // Create a custom copy of redux-thunk that takes the custom axios as an extra arg,
  // so that the customized instance of axios is available in action creators
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

// Re-render on client side over the skeleton rendered by the server whatever's missing, e.g. event handlers.
// Use hydrate() instead of render()
// Instead of a Routes component use a div with react-router-config module which is passed an array of routes
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
