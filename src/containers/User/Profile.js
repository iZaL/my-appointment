'use strict';
import React, { Component, PropTypes } from 'react';
import { ScrollView, Image, View } from 'react-native';
import { connect } from 'react-redux';
import CompanyList from './../../components/Company/CompanyList';
import NoResult from './../../components/NoResult';
import LoadingIndicator from './../../components/LoadingIndicator';
import { Actions } from 'react-native-router-flux';
import ProfileScene  from './../../components/ProfileScene';

class Profile extends Component {

  constructor(props) {
    super(props);
  }

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
