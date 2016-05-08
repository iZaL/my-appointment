import React, { Component } from 'react';
import { ListView, ScrollView, TouchableHighlight, StyleSheet, Text, View,AlertIOS } from 'react-native';
import { logoutUser } from './../../actions/Auth/login';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SettingsCell from './Components/SettingsCell';
import SettingScene from './../../components/SettingScene';
import find from 'lodash/find';

class Settings extends Component {

  constructor(props) {
    super(props);
  }

  performLogout() {
    this.props.dispatch(logoutUser());
    Actions.main();
  }

  loadScene(name){
    switch(name) {
      case 'profile':
        Actions.mediasRouter();
        return Actions.userScene({
          title:this.props.authUser.name,
          userID:this.props.authUser.id
        });
      default :
        return;
    }
  }

  logout() {
    AlertIOS.alert('Are you sure you want to logout ?  ', null, [{text: 'Yes', onPress:()=>{this.performLogout()}},{text:'No'}]);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{backgroundColor: '#f0f5f5',paddingTop:64}}>
        <SettingsCell icon="ion|power" title="Logout" callback={()=>this.logout()} />
        <SettingsCell icon="ion|person" title="Profile" callback={()=>this.loadScene('profile')} />
        <SettingsCell icon="ion|information-circled" title="About" callback={()=>this.loadScene('about')} />
        <SettingsCell icon="ion|help-circled" title="Contact Us" callback={()=>this.loadScene('contact')} />
        <SettingsCell icon="ion|ios-checkmark" title="Terms and Conditions" callback={()=>this.loadScene('terms')} />
        <SettingsCell icon="ion|social-instagram-outline" title="Follow " callback={()=>this.loadScene('instagram')} />
      </ScrollView>
    );

  }
}

function mapStateToProps(state) {
  return {
    authUser:state.entities.users ? find(state.entities.users,['id',state.userReducer.authUserID]) : ''
  }
}

export default connect(mapStateToProps)(Settings);
