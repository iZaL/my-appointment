'use strict';
import React, {Component, PropTypes} from "react";
import {View, ScrollView, SegmentedControlIOS, Linking,ActionSheetIOS} from "react-native";
import {connect} from "react-redux";
import {fetchCompany, setCompanyService} from "./../../actions/Company/company";
import CompanyItem from "./../../components/Company/CompanyItem";
import ServiceList from "./../../components/Service/ServiceList";
import LoadingIndicator from "./../../components/LoadingIndicator";
import CompanyMap from "./../../components/Company/CompanyMap";
import CompanyDescription from "./../../components/Company/CompanyDescription";
import CompanyContact from "./../../components/Company/CompanyContact";
import {APP_STYLES} from "./../../utils/AppStyles";
import {Actions} from "react-native-router-flux";

class Company extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    itemID:PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex : 0
    };
    this.onChange = this.onChange.bind(this);
    this.loadDateTime = this.loadDateTime.bind(this);
    this.followLocation = this.followLocation.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchCompany(this.props.itemID,['services','employees','favorites']));
  }

  loadDateTime(service) {
    this.props.dispatch(setCompanyService(service.id));
    return Actions.appointmentContainer({
      title:service.name_en,
      serviceID:service.id,
      companyID:this.props.itemID
    });
  }

  onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex
    });
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

  render() {
    const {company, services } = this.props;

    let selectedComponent;

    let mapPin = {
      title:company.name,
      subtitle:company.location,
      latitude:parseFloat(company.latitude),
      longitude:parseFloat(company.longitude)
    };

    if(this.state.selectedIndex === 1) {
      selectedComponent =
        <View>
          <CompanyDescription company={company} />
          <CompanyContact company={company} />
        </View>
    } else if(this.state.selectedIndex === 2) {
      selectedComponent =
        <CompanyMap
          company={company}
          followLocation={this.followLocation}
          pin={mapPin}
        />
    } else {
      if(company.services) {
        selectedComponent =
          <ServiceList company={company} services={services} loadDateTime={this.loadDateTime} />
      } else {
        selectedComponent =
          <LoadingIndicator />
      }
    }

    return (
      <ScrollView style={{ flex:1,backgroundColor:'white' }} contentContainerStyle={{paddingTop: 64}} contentInset={{ bottom:50 }} >
        <CompanyItem company={company}/>
        <View style={{margin:5,marginTop:20}}>
          <SegmentedControlIOS
            values={['Services', 'Description','Map']}
            tintColor={APP_STYLES.primaryColor}
            selectedIndex={this.state.selectedIndex}
            onChange={this.onChange}
          />
          {selectedComponent}
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state,ownProps) {

  const { companyReducer,entities} = state;
  const company = entities.companies[ownProps.itemID];

  return {
    companyReducer,
    company,
    services:company && company.services ? company.services.map((serviceID) => entities.services[serviceID]) : []
  }

}


export default connect(mapStateToProps)(Company);
