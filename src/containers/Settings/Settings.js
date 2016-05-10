import React, { Component } from 'react';
import { ListView, ScrollView, TouchableHighlight, StyleSheet, Text, View,AlertIOS,Linking } from 'react-native';
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

  loadLink(name){
    switch(name) {
      case 'profile':
        Actions.mediasRouter();
        return Actions.userScene({
          title:this.props.authUser.name,
          userID:this.props.authUser.id
        });
        case 'about':
        return Actions.about({
          title:'About'
        });
      case 'instagram' :
        return this.openLink('instagram://user?username=pets');
      case 'facebook' :
        return this.openLink('fb://profile/630026573700812');
      case 'twitter' :
        return this.openLink('twitter://user?screen_name=music');
      default :
        return;
    }
  }

  openLink(url) {
    Linking.openURL(url);
  }

  logout() {
    AlertIOS.alert('Are you sure you want to logout ?  ', null, [{text: 'Yes', onPress:()=>{this.performLogout()}},{text:'No'}]);
  }

  render() {
    return (
      <ScrollView style={{flex:1,backgroundColor: 'white',paddingTop:64}}>
        <SettingsCell icon="ion|power" title="Logout" callback={()=>this.logout()} />
        <SettingsCell icon="ion|person" title="Profile" callback={()=>this.loadLink('profile')} />
        <SettingsCell icon="ion|information-circled" title="About" callback={()=>this.loadLink('about')} />
        <SettingsCell icon="ion|help-circled" title="Contact Us" callback={()=>this.loadLink('contact')} />
        <SettingsCell icon="ion|ios-checkmark" title="Terms and Conditions" callback={()=>this.loadLink('terms')} />
        <SettingsCell icon="ion|social-instagram-outline" title="Follow us on Instagram " callback={()=>this.loadLink('instagram')} />
        <SettingsCell icon="ion|social-facebook-outline" title="Join our Facebook Page" callback={()=>this.loadLink('facebook')} />
        <SettingsCell icon="ion|social-twitter-outline" title="Follow us on Twitter" callback={()=>this.loadLink('twitter')} />
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
