// Container component for both page components and reusable components
import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions';

// Call renderRoutes & pass it any routes matched during the matchRoutes process
const App = ({ route }) => {
  // Any child routes that are matched will be turned into route components
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

// To tie data loading to this component, e.g. action creator/request executed for every single page in the app
export default {
  component: App,
  // loadData function gets called with the redux store, rather than recieve the whole store
  // just destructure off the dispatch function
  // fetchCurrentUser always gets called to check if the user is logged in/out,
  // so that the Header component knows which button to show
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};
