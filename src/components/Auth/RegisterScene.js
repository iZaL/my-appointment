'use strict';
import React, {Component,PropTypes} from 'react';
import {  StyleSheet, Text, View,  TouchableHighlight, TextInput } from 'react-native';
import FormButton from './../FormButton';
import { APP_STYLES } from './../../utils/AppStyles';
import LoadingIndicator from './../../components/LoadingIndicator';

export default class RegisterScene extends Component {

  render() {

    const { name,email,password,passwordConfirmation,mobile,registerReducer, registerUser, handleLoginRoute,onFieldChange } = this.props;

    return (

      <View style={styles.container}>

        {registerReducer.isFetching && <LoadingIndicator style={{ marginTop:10}} /> }

        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => onFieldChange('name',value)}
          value={name}
          maxLength={40}
          placeholderTextColor="gray"
          placeholder="Name"
        />

        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => onFieldChange('email',value)}
          value={email}
          maxLength={40}
          placeholderTextColor="gray"
          placeholder="Email"
        />

        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => onFieldChange('password',value)}
          value={password}
          maxLength={40}
          placeholderTextColor="gray"
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => onFieldChange('passwordConfirmation',value)}
          value={passwordConfirmation}
          maxLength={40}
          placeholderTextColor="gray"
          placeholder="Password Confirmation"
          secureTextEntry={true}

        />
        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => onFieldChange('mobile',value)}
          value={mobile}
          maxLength={40}
          placeholderTextColor="gray"
          placeholder="Mobile"
        />


        <FormButton
          onPress={()=> registerUser()}
          buttonText='Register'/>

        <TouchableHighlight
          onPress={()=>handleLoginRoute()}
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
  textInput:{
    height: 40,
    borderColor: APP_STYLES.secondaryColor,
    borderWidth: 1,
    marginBottom:20,
    fontSize:15,
    paddingLeft:10,
  },
});