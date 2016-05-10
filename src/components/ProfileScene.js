'use strict';
import React, {Component,PropTypes} from 'react';
import PageViewer from './PageViewer';
import {Actions } from 'react-native-router-flux';
import { ScrollView, StyleSheet, Text, View} from 'react-native';

export default class ProfileScene extends Component {

  render() {
    return (
      <PageViewer
        title="Profile"
        headerImage={require('./../assets/img/notifications-background.png')}
      >
        <View style={styles.container}>
          <Text>Profile Page</Text>
        </View>
      </PageViewer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },

});