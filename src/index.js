// NOTE: We can use import statements on the server thanks to webpack
// Execute module and polyfill async/await syntax for babel
import 'babel-polyfill';
import express from 'express';
// Used to return an array of matched routes
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();
// Open up "public" folder to the outside world
app.use(express.static('public'));
const port = 3000;

// Express will pass all routes to helper function "renderer"
// Then pass request object to renderer, which in turn will be used by react router
app.get('*', (req, res) => {
  // Use helper function to create a store to pass it as 2nd arg to renderer
  const store = createStore();

  // Take incoming request path, and look at route config object to decide what components need to be rendered
  // 1st arg is list of routes, 2nd arg is the path user is fetching
  // It returns as an array of promises, representing all the pending network requests from all the action creators
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    // Check if a component has a loadData first, since not all might
    // Run each component's loadData function, storing what it returns
    // All loadData functions will have a reference to the server side redux store
    return route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises).then(() => {
    // All data loading requests must be completed by the point--list of promises have been resolved
    // Render the app with the collected data
    res.send(renderer(req, store));
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
