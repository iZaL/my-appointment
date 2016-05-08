'use strict';
import React, { Component, PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { signup,onRegisterFormFieldChange } from '../../actions/Auth/register';
import RegisterScene from './../../components/Auth/RegisterScene';
import LoadingIndicator from './../../components/LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;

class Register extends Component {

  constructor(props) {

    super(props);

    const {fields} = this.props.register.form;

    this.state = {
      fields: {
        name: fields.name,
        email: fields.email,
        password: fields.password,
        passwordConfirmation: fields.passwordConfirmation,
        mobile: fields.mobile
      }
    };
  }


  onFieldChange(value, field) {
    let changedField = field[0];
    const { dispatch } = this.props;
    dispatch(onRegisterFormFieldChange(changedField, value[changedField]));
    this.setState({fields: value});
  }

  handleRegister() {
    const {dispatch,register} = this.props;
    const fields = this.state.fields;
    console.log('fields', JSON.stringify(fields));
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
