import React, { Component } from 'react';
import { ScrollView, AlertIOS } from 'react-native';
import { logoutUser } from './../../actions/Auth/login';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SettingsCell from './Components/SettingsCell';
import find from 'lodash/find';

class Settings extends Component {

  constructor(props) {
    super(props);
    this.loadLink = this.loadLink.bind(this);
  }

  performLogout() {
    this.props.dispatch(logoutUser());
    return Actions.main();
  }

  loadLink(name){
    switch(name) {
      case 'about':
        return Actions.about();
      case 'term':
        return Actions.term();
      case 'profile':
        return Actions.profile();
      case 'contact':
        return Actions.contact();
      case 'logout' :
        return AlertIOS.alert('Are you sure you want to logout ?  ', null, [{text: 'Yes', onPress:()=>{this.performLogout()}},{text:'No'}]);
      default :
        return;
    }
  }

  render() {
    return (
      <ScrollView style={{flex:1,backgroundColor: 'white',paddingTop:80}}>
        <SettingsCell icon="ios-power-outline" title="Logout" name="logout" callback={this.loadLink} />
        <SettingsCell icon="ios-person-outline" title="Profile" name="profile" callback={this.loadLink} />
        <SettingsCell icon="ios-information-circle-outline" title="About" name="about" callback={this.loadLink} />
        <SettingsCell icon="ios-help-circle-outline" title="Contact Us" name="contact" callback={this.loadLink} />
        <SettingsCell icon="ios-checkmark" title="Terms and Conditions" name="term" callback={this.loadLink} />
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
