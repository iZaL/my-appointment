'use strict';
import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { login } from '../../actions/Auth/login';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LoginScene from './../../components/Auth/LoginScene';

export default class Login extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      email: 'admin@test.com',
      password: 'password'
    };
    
    this.onFieldChange = this.onFieldChange.bind(this);
  };

  loginUser() {
    console.log('login user');
    const {dispatch} = this.props;
    const credentials = { email:this.state.email,password:this.state.password};

    dispatch(login(credentials))
      .then((success)=> {
        if(success) {
          Actions.main();
        } else {
          alert('Wrong Credentials, Try again');
        }
      })
      .catch(()=>{alert('network error')});
  }

  handleRegisterRoute() {
    console.log('handleRegisterRoute');

    return Actions.register();
  }

  handleForgotPasswordRoute() {
    console.log('handleForgotPasswordRoute');

    // @todo: implement route
    return Actions.main();
  }

  onFieldChange(name,value) {
    console.log('name',name);
    console.log('value',value);
  }

  render() {
    const { loginReducer } = this.props;
    return (
      <ScrollView contentContainerStyle={{flex:1,paddingTop: 64,backgroundColor:'white'}}>
        <LoginScene
          {...this.state}
          loginReducer={loginReducer}
          loginUser={()=>this.loginUser()}
          handleRegisterRoute={()=>this.handleRegisterRoute()}
          handleForgotPasswordRoute={()=>this.handleForgotPasswordRoute()}
          onFieldChange={()=>this.onFieldChange()}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginReducer : state.loginReducer
  }
}

export default connect(mapStateToProps)(Login);