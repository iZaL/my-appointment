'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, Image, View, Dimensions } from 'react-native';

export default class PromoImage extends Component {

  static propTypes = {

  };

  render() {
    return (
      <Image
        style={styles.container}
        source={this.props.image}
      >
        <View style={styles.promoView}>
          <Text style={[styles.text, styles.promoHeader]}>{this.props.header}</Text>
          <Text style={[styles.text, styles.promoDescription]}>{this.props.description}</Text>
          <Text style={[styles.text, styles.promoText]}>{this.props.promoText}</Text>
        </View>
        </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
  },
  promoView: {
    flex:1,
    backgroundColor: 'transparent',
    justifyContent:'center',
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  promoHeader: {
    fontSize: 42,
    fontWeight: '700',
    alignSelf: 'center'
  },
  promoDescription: {
    fontSize: 22,
    fontWeight: '300',
    alignSelf: 'center',
    padding:10
  },
  promoText: {
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'center',
    lineHeight: 22,
    padding:10
  },
});
