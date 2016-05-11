'use strict';
import React, {Component,PropTypes} from 'react';
import PageViewer from './PageViewer';
import {Actions } from 'react-native-router-flux';
import { ScrollView, View, StyleSheet, Text} from 'react-native';

var ListContainer = require('./ListContainer');


export default class About extends Component {

  render() {
    return (
      //<PageViewer
      //  title="About"
      //  headerImage={require('./../assets/img/info-background.png')}
      //>
      //  <View style={styles.container}>
      //    <Text>about us about us about us</Text>
      //  </View>
      //</PageViewer>

      <ListContainer

        title="Maps"
        backgroundImage={require('./../assets/img/info-background.png')}
        backgroundColor={'#9176D2'}>

        <View>
          <Text>Hi</Text>
        </View>

      </ListContainer>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },

});