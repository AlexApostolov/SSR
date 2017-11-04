import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';
import requireAuth from '../components/hocs/requireAuth';

class AdminsListPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    // Map over the list of admins passed to this component as a prop
    return this.props.admins.map(admin => {
      return <li key={admin.id}>{admin.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h3>Protected List of Admins</h3>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ admins }) {
  return { admins };
}

export default {
  // We want to call the action creator from within this component in case a user navigates over from another page,
  // so we pass it to "connect".
  component: connect(mapStateToProps, { fetchAdmins })(
    // Furthermore, we want to wrap the component in the Higher Order Component
    requireAuth(AdminsListPage)
  ),
  // We don't need to recieve the entire store, just the dispatch function,
  // then call it and pass in the action creator
  loadData: ({ dispatch }) => dispatch(fetchAdmins())
};
