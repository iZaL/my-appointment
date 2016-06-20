'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet,View,Text,Dimensions,TouchableOpacity,TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import { assets } from './../../utils/assets';

export default class CompanyMapsMarker extends Component {

  static propTypes = {
    region:PropTypes.object.isRequired,
    onRegionChange:PropTypes.func.isRequired,
    followLocation:PropTypes.func.isRequired,
  };

  render() {
    const {companies,followLocation,region} = this.props;
    return (

      <MapView
        ref="map"
        style={styles.map}
        region={region}
        //onRegionChange={()=>this.props.onRegionChange()}
      >
        { Object.keys(companies).map(function (key) {
          var company = Object.assign({},companies[key]);
          return (
            <MapView.Marker
              ref={"ref"+company.id}
              key={"key"+company.id}
              coordinate={{latitude:parseFloat(company.latitude),longitude:parseFloat(company.longitude)}}
              title={company.name_en}
              description={`${company.address_en},${company.city_en}`}
              onSelect={()=>followLocation(company)}
              pinColor="blue"
           />
          );
        })}
        <View/>
      </MapView>
    );
  }
}

var styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'green'
  },
  getDirectionText:{
    textDecorationLine:'underline',
    paddingTop:20,
    fontSize:9,
  },
  companyName : {
    fontSize:9,
    padding:5,
    color:'black',
    fontWeight:'400'
  }
});
