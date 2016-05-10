import React, { Component, PropTypes} from 'react';
import { StatusBar,TouchableOpacity, StyleSheet, Text, View,} from 'react-native';
import { Icon } from 'react-native-icons';
import PromoImage from './PromoImage';
var Carousel = require('react-native-carousel');
import { Actions } from 'react-native-router-flux';

export default class IntroCarousel extends Component {

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <View >
        <Carousel delay={5000} style={styles.container} indicatorSize={30} indicatorOffset={90}>
          <PromoImage image={require('./../assets/img/bghome.png')}
                      header="My Appointment"
                      description="book your appointment"
                      promoText=""
          />
          <PromoImage image={require('./../assets/img/bg.png')}
                      header="Heading"
                      description="description"
                      promoText="Promo Text"
          />

        </Carousel>
        <View style={styles.skipWrapper}>
          <TouchableOpacity onPress={()=>Actions.main()} >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  skipWrapper:{
    bottom:50,
    alignItems:'center'
  },
  skipText: {
    color:'white',
    textDecorationLine:'underline',
    fontSize:16
  }
});