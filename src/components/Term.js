'use strict';
import React, {Component,PropTypes} from 'react';
import {Actions } from 'react-native-router-flux';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import F8ListContainer from './F8/F8ListContainer';
import F8PureListView from './F8/F8PureListView';

export default class Term extends Component {

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
        title="Terms"
        backgroundImage={require('./../assets/img/notifications-background.png')}
        backgroundColor={'#9176D2'}
        leftItem={this.filterItem()}
      >
        <F8PureListView
          enableEmptySections={true}
          title='Terms and Condition'
          renderEmptyList={() =>
            <TermInfo />
          }
        />
        <F8PureListView
          enableEmptySections={true}
          title='Terms'
          renderEmptyList={() =>
            <TermInfo />
          }
        />
      </F8ListContainer>
    )
  }
}

class TermInfo extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
          <Text style={styles.title}>terms and conditions</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding:10
  },
  header: {
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold'
  }
});