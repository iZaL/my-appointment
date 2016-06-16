'use strict';
import React, { PropTypes, Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-vector-icons/Ionicons';
import LoadingIndicator from './../LoadingIndicator';
import { Actions } from 'react-native-router-flux'
const Modal = require('react-native-modalbox');

export default class AppointmentConfirm extends Component {

  static propTypes = {
    company:PropTypes.object.isRequired,
    selectedEmployee:PropTypes.object.isRequired,
    selectedTime:PropTypes.object.isRequired,
    //selectedDate:PropTypes.string.isRequired,
    onClosed:PropTypes.func.isRequired,
    showAppointmentConfirmModal:PropTypes.bool.isRequired,
    onAppointmentConfirm:PropTypes.func.isRequired,
    inValidateAppointment:PropTypes.func.isRequired,
    userReducer:PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.showAppointmentConfirmModal) {
      this.refs.appointmentConfirmModal.open();
    } else {
      this.refs.appointmentConfirmModal.close();
    }
  }

  closeModal() {
    this.refs.appointmentConfirmModal.close();
  }

  confirmAppointment() {
    return this.props.onAppointmentConfirm();
  }

  invalidateAppointment() {
    return this.props.inValidateAppointment();
  }

  showAppointmentSuccessText() {
    return (
      <TouchableHighlight underlayColor='transparent' onPress={()=>this.invalidateAppointment()}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{ fontSize:20,color:'#003333' }}> Appointment Confirmed</Text>
        </View>
      </TouchableHighlight>
    );
  }

  showAppointmentButton() {

    const { selectedDate,selectedTime,selectedEmployee,company,userReducer,service } = this.props;

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{ fontSize:20,color:'#003333' }}>ALMOST DONE !</Text>
        <Text style={{ paddingTop:20, fontSize:13, textAlign:'center',color:'#003333',fontFamily:'menlo',lineHeight:25 }}> You Wanted a
          <Text style={{ color:'#722A2A'}}> {service.name_en} </Text>
          <Text style={{ color:'#722A2A'}}> {selectedEmployee.id  ? ' with ' + selectedEmployee.name_en : ''} at </Text>
          <Text style={{ color:'#722A2A'}}> {selectedTime.time_en} </Text> At
          <Text style={{ color:'#722A2A'}}> {company.name_en} </Text> On
          <Text style={{ color:'#722A2A'}}> {selectedDate.toISOString().slice(0, 10)} </Text>
        </Text>

        { userReducer.appointments.error != null ? <Text>Error occured, try again </Text>: <Text/>}
        { userReducer.appointments.isCreating ? <LoadingIndicator /> :
          <TouchableHighlight underlayColor='transparent' onPress={()=>this.confirmAppointment()}>
            <View style={{marginTop:10, height:80,width:80,borderRadius:40,backgroundColor:'#FF4646',justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#E1E3E3',fontFamily:'menlo'}}>
                Book It
              </Text>
            </View>
          </TouchableHighlight>
        }

        <View style={{marginTop:10,marginBottom:10}}>
          <TouchableHighlight underlayColor='transparent' onPress={()=>this.closeModal()}>
            <Text style={{color:'#472036',fontFamily:'menlo',fontSize:10}}>
              Click here to Edit
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );

  }

  render() {
    const {userReducer} = this.props;

    return(
      <Modal
        backdrop={true} backdropOpacity={0.7} backdropColor="black"
        position="center"
        style={styles.container}
        ref={"appointmentConfirmModal"}
        swipeToClose={true}
        onClosed={this.props.onClosed}
        backdropContent={
            <Icon
              name='ion|close'
              size={20}
              color={'white'}
              style={styles.closeButton}
            />
          }
      >
        { userReducer.appointments.created ?  this.showAppointmentSuccessText() : this.showAppointmentButton() }

      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    height:300,
    width:350,
    paddingRight:10,
    paddingLeft:10,
  },
  closeButton:{
    width:20,
    height:20,
    alignSelf:'flex-end',
    paddingTop:150,
    margin:10
  }
});