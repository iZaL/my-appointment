'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProfileScene  from '../../components/Setting/ProfileScene';

class Profile extends Component {

  render() {
    return (
      <ProfileScene />
    );
  }
}

function mapStateToProps(state) {
  return {
    userReducer:state.userReducer
  }
}

export default connect(mapStateToProps)(Profile);
