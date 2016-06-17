'use strict';
import React, { Component, PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { signup } from '../../actions/Auth/register';
import { Actions } from 'react-native-router-flux';
import RegisterScene from './../../components/Auth/RegisterScene';

class Register extends Component {

  constructor(props) {

    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      mobile: ''
    };

    this.onFieldChange  = this.onFieldChange.bind(this);
  }

  onFieldChange(field,value) {
    this.setState({[field]: value});
  }

  registerUser() {
    const {dispatch} = this.props;
    const fields = {...this.state};
    dispatch(signup(fields, (cb)=> {
      Actions.login();
    }));
  }

  handleLoginRoute() {
    return Actions.login();
  }

  render() {
    const { registerReducer } = this.props;

    return (

      <ScrollView contentContainerStyle={{flex:1,backgroundColor:'white',paddingTop: 64}}>


        <RegisterScene
          {...this.state}
          registerReducer={registerReducer}
          registerUser={this.registerUser}
          handleLoginRoute={this.handleLoginRoute}
          onFieldChange={this.onFieldChange}
        />

      </ScrollView>
    );
  }

}

function mapStateToProps(state) {
  const { registerReducer } = state;
  return {
    registerReducer
  }
}

export default connect(mapStateToProps)(Register)
