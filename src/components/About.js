'use strict';
import React, {Component,PropTypes} from 'react';
import PageViewer from './PageViewer';
import {Actions } from 'react-native-router-flux';
import { ScrollView, View, StyleSheet, Text} from 'react-native';

var ListContainer = require('./ListContainer');
var PureListView = require('./PureListView');
var ProfilePicture = require('./ProfilePicture');
var FilterHeader = require('./FilterHeader');
export default class About extends Component {

  openFilterScreen() {
    return Actions.pop();
  }

  filterItem() {
    return {
      icon: require('./../assets/img/hamburger.png'),
      title: 'Filter',
      onPress: this.openFilterScreen,
    }
  }

  render() {
    const filterHeader = <FilterHeader filter={['ass','aaaasa']} />

    const profilePicture = <ProfilePicture  size={100} />;

    return (
      <View style={styles.container}>
        <ListContainer
          title="Maps"
          backgroundImage={require('./../assets/img/schedule-background.png')}
          backgroundColor={'#9176D2'}
        >
          <PureListView
            title='ABCD'
            renderEmptyList={() =>
            <View style={styles.container}>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
              <Text>asdasd</Text>
            </View>
          }
          />
          <PureListView
            title='ABCDE'
            renderEmptyList={() =>
            <View style={styles.container} >
            </View>
          }
          />
        </ListContainer>
      </View>

    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex:1,
  },

});