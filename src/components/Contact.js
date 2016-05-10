import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SettingsCell from './../containers/Settings/Components/SettingsCell';
import PageViewer from './PageViewer';

export default class Contact extends Component {

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
      <PageViewer
        title="Contact Us"
        headerImage={require('./../assets/img/notifications-background.png')}
      >
        <View style={styles.container}>

          <SettingsCell icon="ion|social-instagram" title="Follow us on Instagram " callback={()=>this.loadLink('instagram')} />
          <SettingsCell icon="ion|social-twitter" title="Follow us on Twitter" callback={()=>this.loadLink('twitter')} />
          <SettingsCell icon="ion|social-facebook" title="Join our Facebook Page" callback={()=>this.loadLink('facebook')} />
        </View>
      </PageViewer>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },

});
