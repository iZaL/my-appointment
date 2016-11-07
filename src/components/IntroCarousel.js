import React, { Component, PropTypes} from 'react';
import { StatusBar,TouchableOpacity, StyleSheet, Text, View,} from 'react-native';
import PromoImage from './PromoImage';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

export default class IntroCarousel extends Component {

  render() {
    return (
      <View >
        <Swiper showsButtons={false} loop={false} automaticallyAdjustContentInsets={false} >
          <View style={{flex:1}}>
            <PromoImage image={require('./../assets/img/bghome.png')}
                        header="My Appointment"
                        description="book your appointment"
                        promoText=""
            />
          </View>
          <View style={{flex:1}}>
            <PromoImage image={require('./../assets/img/bg.png')}
                        header="Heading"
                        description="description"
                        promoText="Promo Text"
            />
          </View>
        </Swiper>
        <TouchableOpacity onPress={()=>Actions.main()} >
          <View style={styles.skipWrapper}>
            <Text style={styles.skipText}>Skip</Text>
          </View>
        </TouchableOpacity>
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
    padding:10,
    alignItems:'center',
    backgroundColor:'green'
  },
  skipText: {
    color:'white',
    textDecorationLine:'underline',
    fontSize:17,
    fontWeight:'500',

  }
});