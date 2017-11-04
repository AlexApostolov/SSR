// For a Universal app it's best to do error handling during rendering phase of the app,
// not before--during initial load data attempt--since that only occurs on the server

// RequireAuth is a Higher Order Component that inspects the state
// that was fetched by the App component and AdminsListPage (& other auth'd pages) to decide how to handle the user,
// & redirect them if not auth'd
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
  // New component to wrap the ChildComponent
  class RequireAuth extends Component {
    render() {
      // Inspect auth piece of state and decide what to do with the user
      switch (this.props.auth) {
        case false:
          // User is definitely not logged in/autheticated, so redirect them to home page
          return <Redirect to="/" />;
        case null:
          // Have not yet fetched the user's authentication state
          return <div>Loading...</div>;
        default:
          // If user is signed in, show the child component
          // Return the child component and pass the props from the HOC through to it
          return <ChildComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  // Use "connect" helper to wrap the just created RequireAuth
  // It will use the "auth" piece of state from the authReducer: null, false, or action.payload.data
  // Export the final wrapped version of this component
  return connect(mapStateToProps)(RequireAuth);
};
