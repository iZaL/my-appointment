'use strict';
import React, {Component,PropTypes} from 'react';
import PageViewer from './PageViewer';
import { Actions } from 'react-native-router-flux';
import { ScrollView, View, StyleSheet, Text} from 'react-native';
import F8ListContainer from './F8/F8ListContainer';
import F8PureListView from './F8/F8PureListView';
import FilterHeader from './FilterHeader';
import ProfilePicture from './ProfilePicture';
import SocialAccounts from './SocialAccounts';

export default class About extends Component {

  openFilterScreen() {
    return Actions.pop();
  }

  filterItem() {
    return {
      icon: require('./../assets/img/hamburger.png'),
      title:'×',
      onPress: this.openFilterScreen,
    }
  }

  render() {
    const filterHeader = <FilterHeader filter={['ass','aaaasa']} />

    const parallaxContent = <ProfilePicture  size={100} />;

    return (
        <F8ListContainer
          title="About us"
          backgroundImage={require('./../assets/img/notifications-background.png')}
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
            <View style={styles.container} >
              <Text>asd</Text>
            </View>
          }
          />
        </F8ListContainer>

    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex:1,
  },

});