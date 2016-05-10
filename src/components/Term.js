'use strict';
import React, {Component,PropTypes} from 'react';
import PageViewer from './PageViewer';
import {Actions } from 'react-native-router-flux';
import { ScrollView, StyleSheet, Text, View} from 'react-native';

export default class Term extends Component {

  render() {
    return (
      <PageViewer
        title="Terms and Condition"
        headerImage={require('./../assets/img/info-background.png')}
      >
        <View style={styles.container}>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
          <Text>Terms and Condition</Text>
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