'use strict';
import React, { Component, Image, StyleSheet, Text, TouchableHighlight, View, ListView} from 'react-native';
import { Icon } from 'react-native-vector-icons/Ionicons';

export default class CategoryItem extends Component {

  renderContent(category) {
    return (
      <Image source={{uri:category.thumbnail.name}} style={styles.container}>
        <Text style={styles.text}>{category.name}</Text>
      </Image>
    )
  }

  render() {

    const {category} = this.props;

    if (category.id && category.id > 0) {
      return this.renderContent(category);
    }
    return <View/>;
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: 200,
    opacity:.8
  },
  img: {
    height: 200,
    borderRadius: 5,
    paddingTop: 10
  },
  commentImg: {
    width: 24,
    height: 22,
    marginRight: 50,
    alignSelf: "center",
  },
  favoriteImg: {
    width: 24,
    height: 22,
    alignSelf: "center"
  },
  thumbnail: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  name: {
    color: '#888888',
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    textAlign: 'right',
    paddingRight: 3
  },
  createdAt: {
    flex: 1,
    fontWeight: '200',
    color: '#888888',
    fontSize: 12,
    alignSelf: 'center'
  }

});
