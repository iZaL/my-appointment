import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import SettingsCell from './../containers/Settings/Components/SettingsCell';

export default class SocialAccounts extends Component {

  constructor(props) {
    super(props);
  }

  loadLink(name){
    switch(name) {
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
  
  render() {
    return (
      <View style={styles.container}>
        <SettingsCell icon="logo-instagram" title="Follow us on Instagram " callback={()=>this.loadLink('instagram')} />
        <SettingsCell icon="logo-twitter" title="Follow us on Twitter" callback={()=>this.loadLink('twitter')} />
        <SettingsCell icon="logo-facebook" title="Join our Facebook Page" callback={()=>this.loadLink('facebook')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },
});
