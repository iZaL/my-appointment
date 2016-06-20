import React, { PropTypes, Component } from 'react';
import { StyleSheet,View,Text,Dimensions,TouchableOpacity,Linking, ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import { fetchCompanies } from './../../actions/Company/companies';
import CompanyMapsMarker from './../../components/Company/CompanyMapsMarker';

class Map extends  Component {

  constructor(props) {

    super(props);

    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE = 29.3667;
    const LONGITUDE = 47.9667;
    const LATITUDE_DELTA = 1.5;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };

    this.onRegionChange = this.onRegionChange.bind(this);
    this.openMaps = this.openMaps.bind(this);
    this.followLocation = this.followLocation.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCompanies());
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  followLocation(company) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: `${company.name_en}, ${company.address_en} - ${company.city_en}`,
        options: ['Open in Apple Maps', 'Open in Google Maps', 'Cancel'],
        destructiveButtonIndex: -1,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        this.openMaps(company,buttonIndex);
      }
    );

  }

  openMaps(company,buttonIndex) {
    var address = encodeURIComponent(company.address_en);
    switch (buttonIndex) {
      case 0:
        Linking.openURL('http://maps.apple.com/?q=' + address);
        break;
      case 1:
        // var nativeGoogleUrl = 'comgooglemaps://?q=' +
        //   address + '&x-success=f8://&x-source=F8';
        var nativeGoogleUrl = `comgooglemaps://?daddr=${parseFloat(company.latitude)},${parseFloat(company.longitude)}&center=${parseFloat(company.latitude)},${parseFloat(company.longitude)}&zoom=14&views=traffic&directionsmode=driving`;
        Linking.canOpenURL(nativeGoogleUrl).then((supported) => {
          var url = supported ? nativeGoogleUrl : 'http://maps.google.com/?q=' + address;
          Linking.openURL(url);
        });
        break;
    }

  }

// followLocation(company) {
//   let url = `comgooglemaps://?center=${parseFloat(company.latitude)},${parseFloat(company.longitude)}&zoom=14&views=traffic`;
//   Linking.canOpenURL(url).then(supported => {
//     if (supported) {
//       Linking.openURL(url);
//     } else {console.log('Don\'t know how to open URI: ' + url);}
//   });
// }

  render() {
    const { companies } = this.props;
    return (
      <CompanyMapsMarker
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        companies={companies}
        followLocation={this.followLocation}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    companies: state.entities.companies ? state.entities.companies : []
  }
}

export default connect(mapStateToProps)(Map);
