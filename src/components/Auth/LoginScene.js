'use strict'
import React, { Component, PropTypes } from 'react';
import {  StyleSheet, Text, View, Image, TouchableHighlight, TextInput } from 'react-native';
import FormButton from './../FormButton';
import LoadingIndicator from './../../components/LoadingIndicator';

export default class LoginScene extends Component {

  render() {

    const {email,password,handleForm,loginReducer, loginUser, handleRegisterRoutePress, handleForgotPasswordRoutePress } = this.props;

    return (
      <View style={styles.container}>


        {loginReducer.isFetching ? <LoadingIndicator /> : <View />}


        <TextInput
          style={[styles.textInput,styles.textArea]}
          onChangeText={(value) => handleForm('email',value)}
          value={email}
          maxLength={40}
          placeholderTextColor="gray"
        />

        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => handleForm('password',value)}
          value={password}
          maxLength={40}
          placeholderTextColor="gray"
        />
        
        <FormButton
          disabled={loginReducer.isFetching}
          onPress={loginUser()}
          buttonText='Login'
        />

        <TouchableHighlight onPress={handleRegisterRoutePress()} underlayColor='transparent'
                            style={[styles.center,styles.mTop20]}
        >
          <Text style={[styles.label,styles.textUnderline]}>Dont have an account? Register</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={handleForgotPasswordRoutePress()} style={[styles.center,styles.mTop20]}
                            underlayColor='transparent' >
          <Text style={[styles.label,styles.textUnderline]}>Forgot your password ?</Text>
        </TouchableHighlight>

      </View>

    )
  }

}

LoginScene.propTypes = ({
  
});

var styles = StyleSheet.create({

  container:{
    padding:10
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
  center: {
    alignSelf: 'center'
  },
  mTop20: {
    marginTop: 50
  }
})

