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

import Routes from './Routes';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(thunk));

// Re-render on client side over the skeleton rendered by the server whatever's missing, e.g. event handlers.
// Use hydrate() instead of render()
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
