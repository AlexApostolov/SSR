// NOTE: We can use import statements on the server thanks to webpack
// Execute module and polyfill async/await syntax for babel
import 'babel-polyfill';
import express from 'express';
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

  // Some logic to initialize and load data into the store

  res.send(renderer(req, store));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
