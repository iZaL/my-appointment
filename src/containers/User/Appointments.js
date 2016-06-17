'use strict';
import React, { Component, PropTypes } from 'react';
import { ScrollView, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchAppointments,cancelAppointment } from './../../actions/appointments';
import { fetchTimings } from './../../actions/timings';
import { assets } from './../../utils/assets';
import CompanyList from './../../components/Company/CompanyList';
import ConfirmedAppointmentList from './../../components/Appointment/ConfirmedAppointmentList';
import LoadingIndicator from './../../components/LoadingIndicator';
import mapValues from 'lodash/mapValues';
import isEmpty from 'lodash/isEmpty';
import NoResult from './../../components/NoResult';

class Appointments extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.userReducer.isAuthenticated) {
    //  Actions.loginDialog({ dialogText:'Please login to manage your Appointments'});
    //} else {
      this.props.dispatch(fetchTimings());
      this.props.dispatch(fetchAppointments());
    }
  }

  cancelAppointment(appointment) {
    this.props.dispatch(cancelAppointment(appointment.id));
  }

  render() {
    const { userReducer,appointments,companies,services,timings,users,employees } = this.props;
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
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,padding: 10,backgroundColor:'white'}}>
        { userReducer.appointments.isFetching && <LoadingIndicator /> }
        {
          isEmpty(appointmentsArray) &&
          <NoResult
            title="No Appointments Yet"
            description="login to manage your appointments"
            buttonText="Explore Salons"
            callback={()=>Actions.main()}
          />
        }

        <ConfirmedAppointmentList appointments={appointmentsArray} cancelAppointment={this.cancelAppointment.bind(this)} />

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
