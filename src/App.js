'use strict';
import React, { Component } from 'react';
import { StyleSheet,StatusBar } from 'react-native';
import { Router, Reducer } from 'react-native-router-flux'
import { loginUserByToken } from './actions/Auth/login';
import { connect } from 'react-redux';
import { scenes } from './scenes';

const reducerCreate = params=> {
  const defaultReducer = Reducer(params);
  return (state, action)=>{
    console.log("ACTION:", action);
    return defaultReducer(state, action);
  }
};

class App extends Component {

  constructor() {
    super();
    StatusBar.setBarStyle('light-content', true);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(loginUserByToken());
  }

  render() {
    return (
      <Router createReducer={reducerCreate}  sceneStyle={styles.container} scenes={scenes} />
    );
  }

}

function mapStateToProps(state) {
  return {};
}

const styles=  StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"transparent"
  },
});

export default connect(mapStateToProps)(App);
