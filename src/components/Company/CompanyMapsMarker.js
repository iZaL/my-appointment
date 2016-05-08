'use strict';
import React, { PropTypes } from 'react';
import { Component,StyleSheet,View,Text,Dimensions,TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

export default class CompanyMapsMarker extends Component {

  static propTypes = {
    region:PropTypes.object.isRequired,
    onRegionChange:PropTypes.func.isRequired,
    followLocation:PropTypes.func.isRequired,
  };

  render() {
    const {companies,followLocation} = this.props;
    return (

      <MapView
        ref="map"
        style={styles.map}
        region={this.props.region}
        //onRegionChange={()=>this.props.onRegionChange()}
      >
        { Object.keys(companies).map(function (key) {
          var company = Object.assign({},companies[key]);
          return (
            <MapView.Marker
              ref={"ref"+company.id}
              key={"key"+company.id}
              coordinate={{latitude:parseFloat(company.latitude),longitude:parseFloat(company.longitude)}}
            >
              <MapView.Callout>
                <View style={styles.container}>
                  <Text>{company.name_en}</Text>
                  <TouchableOpacity underlayColor="transparent" onPress={()=>followLocation(company)}>
                    <Text style={styles.getDirectionText}>
                      Click here to get direction (google maps)
                    </Text>
                  </TouchableOpacity>
                </View>
              </MapView.Callout>
            </MapView.Marker>
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
  },
  container:{
    justifyContent:'center',
    alignItems:'center'
  },
  getDirectionText:{
    textDecorationLine:'underline',
    paddingTop:20
  }
});
