// NOTE: We can use import statements on the server thanks to webpack
import express from 'express';
import renderer from './helpers/renderer';

const app = express();
// Open up "public" folder to the outside world
app.use(express.static('public'));
const port = 3000;

// Express will pass all routes to helper function "renderer"
// Then pass request object to renderer, which in turn will be used by react router
app.get('*', (req, res) => {
  res.send(renderer(req));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
