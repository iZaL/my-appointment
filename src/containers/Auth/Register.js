'use strict';
import React, { Component, PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { signup } from '../../actions/Auth/register';
import { Actions } from 'react-native-router-flux';
import RegisterScene from './../../components/Auth/RegisterScene';
import LoadingIndicator from './../../components/LoadingIndicator';

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
    this.setState({field: value});
  }

  handleRegister() {
    const {dispatch} = this.props;
    const fields = {...this.state};
    dispatch(signup(fields, (cb)=> {
      Actions.login();
    }));
  }

  handleLoginRoute() {
    Actions.login();
  }

  render() {
    const { register } = this.props;

    if (register.form.error != null) {
      alert('Error, Please try again');
    }

    return (

      <ScrollView contentContainerStyle={{flex:1,backgroundColor:'white',paddingTop: 64}}>

        {register.isFetching ? <LoadingIndicator style={{ marginTop:10}} /> : <View />}

        <RegisterScene
          register={register}
          fields={this.state.fields}
          onRegisterPress={this.handleRegister.bind(this)}
          onLoginRoutePress={this.handleLoginRoute.bind(this)}
          onChange={this.onFieldChange.bind(this)}
        />

      </ScrollView>
    );
  }

}

function mapStateToProps(state) {
  const { register } = state;
  return {
    ...state,
    register
  }
}

export default connect(mapStateToProps)(Register)
