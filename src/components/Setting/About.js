'use strict';
import React, {Component,PropTypes} from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView, View, StyleSheet, Text} from 'react-native';
import F8ListContainer from '../F8/F8ListContainer';
import F8PureListView from '../F8/F8PureListView';
import ProfilePicture from './ProfilePicture';
import SocialAccounts from './SocialAccounts';

export default class About extends Component {

  openFilterScreen() {
    return Actions.pop();
  }

  filterItem() {
    return {
      icon: require('./../../assets/img/hamburger.png'),
      title:'×',
      onPress: this.openFilterScreen,
    }
  }

  render() {

    const parallaxContent = <ProfilePicture  size={100} />;

    return (
        <F8ListContainer
          title="About us"
          backgroundImage={require('./../../assets/img/notifications-background.png')}
          backgroundColor={'#9176D2'}
          leftItem={this.filterItem()}
          parallaxContent={parallaxContent}
        >
          <F8PureListView
            enableEmptySections={true}
            title='Follow us'
            renderEmptyList={() =>
              <SocialAccounts />
          }
          />
          <F8PureListView
            enableEmptySections={true}
            title='Location'
            renderEmptyList={() =>
              <LocationInfo />
          }
          />
        </F8ListContainer>

    )
  }
}

const LocationInfo = () => {
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Page</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:10
  },
  header: {
    flex:1,
    padding:10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold'
  }
});