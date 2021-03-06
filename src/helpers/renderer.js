// House a function that'll simply render the react app and return it as a string
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
// To take the string from store.getState() and escape any characters inside
// utilized to set up script tags
import serialize from 'serialize-javascript';
// Any time the app gets rendered on the server, Helmet will inspect the tags passed to it
// and internalize/store the tags.
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

// Export a function that takes the renderToString function, & takes the content to inject it into the template
// It will also receive the empty "context" object from the Express route used for error handling
export default (req, store, context) => {
  // Essentially the boot up location on the server side

  // StaticRouter requires the "context" prop--gives the ability to communicate from the rendered components
  // back to this renderer file

  // StaticRouter, unlike BrowserRouter, needs to be told exactly the current path
  // that it needs to consider--can't read the browser address bar--by passing the request object
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  // Helmet loads up all meta tags -> Helmet tags added to HTML template
  // Pull all of the tags out of the Helmet library with a helmet instance
  const helmet = Helmet.renderStatic();

  // For state rehydration on the browser we have a script template to get the server store state
  // Instead of using JSON.stringify on the store.getState, use "serialize" library to prevent XSS attacks
  // NOTE: All meta tags are extracted with the one function call helmet.meta: image, type, url etc.
  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
