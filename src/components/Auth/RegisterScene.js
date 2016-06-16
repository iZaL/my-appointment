'use strict';
import React, {Component,PropTypes} from 'react';
import {  StyleSheet, Text, View,  TouchableHighlight, TextInput } from 'react-native';
import FormButton from './../FormButton';
import stylesheet from './../../assets/style/form';

export default class RegisterScene extends Component {

  // handleRegister() {
  //   this.props.onRegisterPress();
  // }
  //
  // handleLoginRoutePress = () => {
  //   this.props.onLoginRoutePress();
  // };

  render() {

    const { registerUser, handleLoginRoutePress } = this.props;
    // const registerForm = t.struct({
    //   name: t.String,
    //   email: t.String,
    //   password: t.String,
    //   passwordConfirmation: t.String,
    //   mobile: t.String
    // });

    return (

      <View style={styles.container}>

        <FormButton
          onPress={()=> registerUser()}
          buttonText='Register'/>

        <TouchableHighlight
          onPress={()=>handleLoginRoutePress()}
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