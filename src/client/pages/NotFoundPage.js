import React from 'react';

// NOTE: Internally the static router renames the "context" prop to "staticContext". It should be defaulted
// to an empty object for the browser, since it doesn't exist--client uses BrowserRouter instead
const NotFoundPage = ({ staticContext = {} }) => {
  // Mark the staticContext object with an error
  staticContext.notFound = true;
  return <h1>Oooops, route not foud.</h1>;
};

export default {
  component: NotFoundPage
};
