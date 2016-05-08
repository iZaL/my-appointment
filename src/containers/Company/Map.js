import React, { PropTypes, Component } from 'react-native';
import { StyleSheet,View,Text,Dimensions,TouchableOpacity,Linking } from 'react-native';
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
  }

  componentDidMount() {
    this.props.dispatch(fetchCompanies());
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  followLocation(company) {
    //let url = `http://maps.apple.com/?ll=${company.latitude},${company.longitude}`;
    let url = `comgooglemaps://?center=${parseFloat(company.latitude)},${parseFloat(company.longitude)}&zoom=14&views=traffic`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {console.log('Don\'t know how to open URI: ' + url);}
    });
  }

  render() {
    const { companies } = this.props;
    return (
      <CompanyMapsMarker
        region={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
        companies={companies}
        followLocation={this.followLocation.bind(this)}
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
