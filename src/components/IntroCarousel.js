import React, { Component, PropTypes} from 'react';
import { StatusBar,TouchableOpacity, StyleSheet, Text, View,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PromoImage from './PromoImage';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

export default class IntroCarousel extends Component {

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    // <Carousel delay={5000} style={styles.container} indicatorSize={30} indicatorOffset={90}>
    //   <PromoImage image={require('./../assets/img/bghome.png')}
    //               header="My Appointment"
    //               description="book your appointment"
    //               promoText=""
    //   />
    //   <PromoImage image={require('./../assets/img/bg.png')}
    //               header="Heading"
    //               description="description"
    //               promoText="Promo Text"
    //   />
    //
    // </Carousel>
    return (
      <View >
        <Swiper showsButtons={false} loop={false} automaticallyAdjustContentInsets={false} >
          <View style={{ flex:1, paddingTop:64}}>
            <PromoImage image={require('./../assets/img/bghome.png')}
                        header="My Appointment"
                        description="book your appointment"
                        promoText=""
            />
          </View>
          <View style={{ flex:1, paddingTop:64}}>
            <PromoImage image={require('./../assets/img/bg.png')}
                        header="Heading"
                        description="description"
                        promoText="Promo Text"
            />
          </View>
        </Swiper>
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