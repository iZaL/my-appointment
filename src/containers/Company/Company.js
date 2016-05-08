'use strict';
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, SegmentedControlIOS,Linking } from 'react-native';
import { connect } from 'react-redux';
import { fetchCompany, setCompanyService } from './../../actions/Company/company';
import CompanyItem from './../../components/Company/CompanyItem';
import ServiceList from './../../components/Service/ServiceList';
import LoadingIndicator from './../../components/LoadingIndicator';
import CompanyMap from './../../components/Company/CompanyMap';
import CompanyDescription from './../../components/Company/CompanyDescription';
import CompanyContact from './../../components/Company/CompanyContact';
import { Actions } from 'react-native-router-flux';

class Company extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex : 0
    };
    this.onChange = this.onChange.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    itemID:PropTypes.number.isRequired
  };

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchCompany(this.props.itemID,['services','employees','favorites']));
  }

  loadDateTime(service) {
    const {dispatch} = this.props;
    dispatch(setCompanyService(service.id));
    Actions.appointmentContainer({
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
    let url = `comgooglemaps://?center=${parseFloat(company.latitude)},${parseFloat(company.longitude)}&zoom=14&views=traffic`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
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
      selectedComponent =  <View>
          <CompanyDescription company={company} />
          <CompanyContact company={company} />
        </View>
    } else if(this.state.selectedIndex === 2) {
      selectedComponent = <CompanyMap
        company={company}
        followLocation={this.followLocation.bind(this)}
        pin={mapPin}
      />
    } else {
      if(company.services) {
        selectedComponent = <ServiceList company={company} services={services} loadDateTime={this.loadDateTime.bind(this)} />
      } else {
        selectedComponent = <LoadingIndicator />
      }
    }

    return (
      <ScrollView style={{ flex:1,backgroundColor:'white' }} contentContainerStyle={{paddingTop: 64}} contentInset={{ bottom:50 }} >
        <CompanyItem company={company}/>
        <View style={{flex:1,margin:5,marginTop:20}}>
          <SegmentedControlIOS values={['Services', 'Description', 'Map']} tintColor="#99ddff" momentary={true} selectedIndex={0}
                               onChange={this.onChange}
          />
          {selectedComponent}
        </View>
      </ScrollView>
    );
  }
  //}
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
