import React, { Component, PropTypes} from 'react';
import { StatusBar,ListView,ScrollView, TouchableHighlight, StyleSheet, Text, View,AlertIOS, Dimensions } from 'react-native';
import { Icon } from 'react-native-icons';
import PromoImage from './PromoImage';
var {width, height} = Dimensions.get('window');
var Carousel = require('react-native-carousel');
export default class IntroCarousel extends Component {

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <Carousel delay={5000} style={styles.container}>
        <PromoImage image="bg.png" />
        <PromoImage image="bg.png" />
        <PromoImage image="bg.png" />
        <PromoImage image="bg.png" />
      </Carousel>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});