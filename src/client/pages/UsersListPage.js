import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  render() {
    return (
      <div>
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
