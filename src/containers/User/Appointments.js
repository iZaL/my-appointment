'use strict';
import React, { Component, PropTypes } from 'react';
import { ScrollView, Image, View, RefreshControl,Linking,ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchAppointments,cancelAppointment } from './../../actions/appointments';
import { fetchTimings } from './../../actions/timings';
import { assets } from './../../utils/assets';
import ConfirmedAppointmentList from './../../components/Appointment/ConfirmedAppointmentList';
import LoadingIndicator from './../../components/LoadingIndicator';
import mapValues from 'lodash/mapValues';
import isEmpty from 'lodash/isEmpty';
import NoResult from './../../components/NoResult';
class Appointments extends Component {

  constructor() {
    super();
    this.state={
      isRefreshing:false
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.followLocation = this.followLocation.bind(this);
  }

  componentDidMount() {
    if(this.props.userReducer.isAuthenticated) {
      this.props.dispatch(fetchTimings());
      this.props.dispatch(fetchAppointments());
    }
  }

  cancelAppointment(appointment) {
    this.props.dispatch(cancelAppointment(appointment.id));
  }

  callback() {
    return Actions.main();
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
        this.openMaps(company, buttonIndex);
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

  onRefresh() {
    this.setState({isRefreshing: true});
    this.props.dispatch(fetchAppointments()).then((val)=>this.setState({isRefreshing: false}));
  }

  render() {
    const { userReducer,appointments,companies,services,timings,users,employees } = this.props;

    //@todo: move to selector
    const appointmentsArray = mapValues(appointments,(appointment) => {
      return Object.assign({},appointment,{
        company:companies[appointment.company],
        service:services[appointment.service],
        employee:appointment.employee ? employees[appointment.employee] : null,
        timing:timings[appointment.timing],
        user:users[appointment.user]
      });
    });

    return (
      <Image source={assets.bg} style={{flex:1,width: null,height: null,paddingTop:64,backgroundColor:'white'}}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom:40}}
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor="pink"
            title="Loading..."
            colors={['white', 'red', 'green']}
            progressBackgroundColor="yellow"
          />
          }
        >

        { userReducer.appointments.isFetching && <LoadingIndicator /> }

        {
          isEmpty(appointmentsArray) ?
            <NoResult
              title="No Appointments Yet"
              description="login to manage your appointments"
              buttonText="Explore Salons"
              callback={this.callback}
            />
            :
            <ConfirmedAppointmentList
              appointments={appointmentsArray}
              cancelAppointment={this.cancelAppointment}
              followLocation={this.followLocation}
            />
        }

          </ScrollView>
      </Image>
    );
  }
}

function mapStateToProps(state) {
  const { entities } = state;
  return {
    userReducer:state.userReducer,
    appointments:entities.appointments,
    companies:entities.companies,
    services:entities.services,
    employees:entities.employees,
    users:entities.users,
    timings:entities.timings,
  }
}

export default connect(mapStateToProps)(Appointments);
