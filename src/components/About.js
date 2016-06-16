'use strict';
import React, {Component,PropTypes} from 'react';
import PageViewer from './PageViewer';
import { Actions } from 'react-native-router-flux';
import { ScrollView, View, StyleSheet, Text} from 'react-native';
import F8ListContainer from './F8/F8ListContainer';
import F8PureListView from './F8/F8PureListView';
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
        <F8ListContainer
          title="Maps"
          backgroundImage={require('./../assets/img/schedule-background.png')}
          backgroundColor={'#9176D2'}
          leftItem={this.filterItem()}
        >
          <F8PureListView
            title='ABCD'
            renderEmptyList={() =>
            <View>
              <View style={{ flex:1, height:100, marginVertical: 20,paddingHorizontal: 20, backgroundColor:'blue'}}>
                  <Text>asd</Text>
                </View>
            </View>
          }
          />
          <F8PureListView
            title='ABCDE'
            renderEmptyList={() =>
            <View style={styles.container} >
            </View>
          }
          />
        </F8ListContainer>
      </View>

    )
  }
}



const styles = StyleSheet.create({
  container: {
  },

});