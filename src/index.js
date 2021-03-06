// NOTE: We can use import statements on the server thanks to webpack
// Execute module and polyfill async/await syntax for babel
import 'babel-polyfill';
import express from 'express';
// Used to return an array of matched routes
import { matchRoutes } from 'react-router-config';
// To handle authentication in a universal app, we need cookie auth through a proxy middleware
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

// The proxy should come before all other middleware
// If the browser ever makes a request to the render server with a route that begins with /api, proxy it off
app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    // NOTE: the options object passed to the proxy function is specific to the course API--not needed in other projects
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  })
);

// Open up "public" folder to the outside world
app.use(express.static('public'));
const port = 3000;

// Express will pass all routes to helper function "renderer"
// Then pass request object to renderer, which in turn will be used by react router
app.get('*', (req, res) => {
  // Use helper function to create a store to pass it as 2nd arg to renderer
  // By passing in the request object when calling the createStore function we are able to
  // attach the cookie from the incoming request from the user's browser in createStore.js
  const store = createStore(req);

  // Take incoming request path, and look at route config object to decide what components need to be rendered
  // 1st arg is list of routes, 2nd arg is the path user is fetching
  // It returns as an array of promises, representing all the pending network requests from all the action creators
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      // Check if a component has a loadData first, since not all might
      // Run each component's loadData function, storing what it returns
      // All loadData functions will have a reference to the server side redux store
      return route.loadData ? route.loadData(store) : null;
      // If one promise in Promise.all is rejected, it will immediately shortcircuit to its catch statement.
      // So take all of those promises collected from all loadData functions and wrap them inside a new promise.
    })
    .map(promise => {
      if (promise) {
        // This outer promise will always be resolved regardless if the inner promise is resolved/rejected.
        return new Promise((resolve, reject) => {
          // Now every single request is given the opportunity to complete before attempting to render the page.
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    // Create empty object for "context" & provide it to renderer.js
    // If something went wrong in one of the components, the context object is marked with an error message
    const context = {};
    // All data loading requests must be completed by the point--list of promises have been resolved
    const content = renderer(req, store, context);

    // When we render the page on the server, while not authenticated,
    // the requireAuth HOC is going to attempt to render the <Redirect>,
    // the server's static router is going to add a new context property, so the context object needs to be inspected.
    if (context.url) {
      return res.redirect(303, context.url);
    }
    // After rendering, examine the "context" object--does it contain an error from NotFoundPage?
    // Send back a 404 status
    if (context.notFound) {
      res.status(404);
    }

    // Render the app with the collected data
    res.send(content);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
