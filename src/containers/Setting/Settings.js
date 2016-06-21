import React, { Component } from 'react';
import { ScrollView, AlertIOS,View } from 'react-native';
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
      case 'logout' :
        return AlertIOS.alert('Are you sure you want to logout ?  ', null, [{text: 'Yes', onPress:()=>{this.performLogout()}},{text:'No'}]);
      case 'login' :
        return Actions.login();
      default :
        return;
    }
  }

  render() {
    console.log('auth user',this.props.authUserID);
    return (
      <ScrollView style={{flex:1,backgroundColor: 'white',paddingTop:80}}>
        {this.props.authUserID !== null ?
          <View>
            <SettingsCell icon="ios-power-outline" title="Logout" name="logout" callback={this.loadLink} />
            <SettingsCell icon="ios-person-outline" title="Profile" name="profile" callback={this.loadLink} />
          </View>
          :
          <SettingsCell icon="ios-key-outline" title="Login" name="login" callback={this.loadLink} />
        }

        <SettingsCell icon="ios-information-circle-outline" title="About" name="about" callback={this.loadLink} />
        <SettingsCell icon="ios-checkmark" title="Terms and Conditions" name="term" callback={this.loadLink} />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUserID:state.userReducer.authUserID
  }
}

export default connect(mapStateToProps)(Settings);
