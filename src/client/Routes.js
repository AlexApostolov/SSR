// Routes shared by both the client and server
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';

// Component to set up all the different route mappings
export default () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
    </div>
  );
};
