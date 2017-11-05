import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  // User visits route -> Helmet tag is rendered ->
  // Then on renderer.js Helmet loads up all meta tags -> Helmet tags added to HTML template
  // Can also change the title dynamically on the fly, e.g. access users list,
  // but must be passed as single string expression.
  // So instead of {this.props.users.length} Users Loaded, use template string inside Title tag
  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="User's App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        Here's a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

// loadData gets the server side redux store
function loadData(store) {
  // Manually dispatch fetchUsers action creator to redux store
  // Return a promise that represents the network request that's going to the API
  return store.dispatch(fetchUsers());
}

export default {
  // loadData initiates a data loading process for required data needed by the component
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
