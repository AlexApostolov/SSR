// Routes shared by both the client and server
import React from 'react';
import Home from './components/Home';
// Import not just the component, but also its loadData function
import UsersList, { loadData } from './components/UsersList';

// Component to set up all the different route mappings
export default [
  // Instead of returning JSX, use an array of objects, where each object represents one possible route,
  // so that we can use react-router-config for SSR to figure out what components to show without rendering the app
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    // For each path, there's a component to show
    // and maybe a 'loadData' function that says what data this component needs
    loadData,
    path: '/users',
    component: UsersList
  }
];
