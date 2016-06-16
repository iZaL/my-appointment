'use strict';
import React, { Component, PropTypes } from 'react';
import {  StyleSheet, Text, View, Image, TouchableHighlight, TextInput } from 'react-native';
import FormButton from './../FormButton';
import LoadingIndicator from './../../components/LoadingIndicator';
import { APP_STYLES } from './../../utils/AppStyles';

export default class LoginScene extends Component {

  render() {

    const { email, password, handleForm, loginReducer, loginUser, handleRegisterRoute, handleForgotPasswordRoute } = this.props;

    return (
      <View style={styles.container}>

        {loginReducer.isFetching && <LoadingIndicator /> }

        <TextInput
          style={[styles.textInput]}
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
          onPress={()=>loginUser()}
          buttonText='Login'
        />

        <TouchableHighlight onPress={()=>handleRegisterRoute()} underlayColor='transparent'
                            style={[styles.center,styles.mTop20]}
        >
          <Text style={[styles.label,styles.textUnderline]}>Dont have an account? Register</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={()=>handleForgotPasswordRoute()} style={[styles.center,styles.mTop20]}
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
    flex:1,
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
  },
  textInput:{
    height: 40,
    borderColor: APP_STYLES.secondaryColor,
    borderWidth: 1,
    marginBottom:20,
    fontSize:15
  },
})

