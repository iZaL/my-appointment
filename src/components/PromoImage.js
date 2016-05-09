'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

export default class PromoImage extends Component {

  static propTypes = {
  };

  render() {
    const image = require(`./../assets/img/bg.png`);
    return (
      <Image
        style={[this.props.style, styles.container]}
        source={image}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    height: null,
    backgroundColor:'white'
  }
});
