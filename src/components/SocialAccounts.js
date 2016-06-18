import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import SettingsCell from './../containers/Settings/Components/SettingsCell';

export default class SocialAccounts extends Component {

  constructor() {
    super();
    this.loadLink = this.loadLink.bind(this);
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
        <SettingsCell icon="logo-instagram" name="instagram" title="Follow us on Instagram " callback={this.loadLink} />
        <SettingsCell icon="logo-twitter" name="twitter" title="Follow us on Twitter" callback={this.loadLink} />
        <SettingsCell icon="logo-facebook" name="facebook" title="Join our Facebook Page" callback={this.loadLink} />
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
