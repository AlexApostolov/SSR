// Routes shared by both the client and server
import React from 'react';
// Only the root level components (page type of component) should have loadData functions tied to them,
// not the reusable components.
// Import not just the component, but also its loadData function
// by having them exported as an object with both functions
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';

// Component to set up all the different route mappings
export default [
  // Instead of returning JSX, use an array of objects, where each object represents one possible route,
  // so that we can use react-router-config for SSR to figure out what components to show without rendering the app
  {
    // Use spread syntax to get both the component and its loadData function,
    // to avoid naming collisions with loadData from other page components
    ...HomePage,
    path: '/',
    exact: true
  },
  {
    // For each path, there's a component to show
    // and maybe a 'loadData' function that says what data this component needs
    ...UsersListPage,
    path: '/users'
  }
];
