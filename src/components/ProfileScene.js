'use strict';
import React, {Component,PropTypes} from 'react';
import {Actions } from 'react-native-router-flux';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import F8ListContainer from './F8/F8ListContainer';
import F8PureListView from './F8/F8PureListView';

export default class ProfileScene extends Component {

  openFilterScreen() {
    return Actions.pop();
  }

  filterItem() {
    return {
      title:'×',
      onPress: this.openFilterScreen,
    }
  }

  render() {
    return (
      <F8ListContainer
        title="Profile"
        backgroundImage={require('./../assets/img/maps-background.png')}
        backgroundColor={'#9176D2'}
        leftItem={this.filterItem()}
      >
        <F8PureListView
          enableEmptySections={true}
          title='Profile'
          renderEmptyList={() =>
            <View>
              <ProfileInfo />
            </View>
          }
        />
      </F8ListContainer>
    )
  }
}

class ProfileInfo extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile Page</Text>
          </View>
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