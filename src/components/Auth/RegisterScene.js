'use strict';
import React from 'react';
import { Component, StyleSheet, Text, View,  TouchableHighlight, TextInput } from 'react-native';
import FormButton from './../FormButton';
import stylesheet from './../../assets/style/form';
import t from 'tcomb-form-native';
const Form = t.form.Form;

export default class RegisterScene extends Component {

  handleRegister() {
    this.props.onRegisterPress();
  }

  handleLoginRoutePress = () => {
    this.props.onLoginRoutePress();
  };

  render() {

    Form.stylesheet = stylesheet;

    const {register} = this.props;

    let name = {
      label: 'Name',
      placeholder: 'Name',
      editable: !register.isFetching,
      hasError: register.form.fields.nameHasError,
      error: 'Please enter valid name',
    };

    let email = {
      label: 'Email',
      placeholder: 'Email',
      keyboardType: 'email-address',
      editable: !register.isFetching,
      hasError: register.form.fields.emailHasError,
      error: 'Please enter valid email',
    };

    let password = {
      label: 'Password',
      placeholder: 'Password',
      maxLength: 12,
      secureTextEntry: true,
      editable: !register.isFetching,
      hasError: register.form.fields.passwordHasError,
      error: 'Must have 6-12 numbers, letters or special characters',
    };

    let passwordConfirmation = {
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      maxLength: 12,
      secureTextEntry: true,
      editable: !register.isFetching,
      hasError: register.form.fields.passwordConfirmationHasError,
      error: 'Password does not match',
    };

    let mobile = {
      label: 'Mobile',
      placeholder: 'Mobile',
      maxLength: 8,
      editable: !register.isFetching,
      hasError: register.form.fields.mobileHasError,
      error: '8 digit phone number',
      help: register.form.fields.mobileHasError ? '' : '8 digit kuwaiti phone number'
    };

    const registerForm = t.struct({
      name: t.String,
      email: t.String,
      password: t.String,
      passwordConfirmation: t.String,
      mobile: t.String
    });

    const options = {
      fields: {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
        mobile: mobile
      }
    };

    return (
      <View style={styles.container}>

        <Form ref="form"
              type={registerForm}
              options={options}
              value={this.props.fields}
              onChange={this.props.onChange}
        />

        <FormButton
          onPress={this.handleRegister.bind(this)}
          buttonText='Register'/>

        <TouchableHighlight
          onPress={this.handleLoginRoutePress.bind(this)}
          style={styles.center}
          underlayColor='transparent'
        >
          <Text style={[styles.label,styles.textUnderline, styles.mTop20]}>have an account ? Login </Text>
        </TouchableHighlight>

      </View>
    );

  }

}

var styles = StyleSheet.create({
  container: {
    padding:10
  },
  buttonGreen: {
    height: 50,
    backgroundColor: '#5BC3BE',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  buttonText: {
    color: '#fff',
    fontSize: 24
  },
  label: {
    fontSize: 14,
    color: '#888888',
  },
  textUnderline: {
    textDecorationLine: 'underline'
  },
  ltr: {
    alignSelf: 'flex-start'
  },
  rtl: {
    alignSelf: 'flex-end'
  },
  mTop20: {
    marginTop: 10
  },
  center: {
    alignSelf: 'center'
  },
});