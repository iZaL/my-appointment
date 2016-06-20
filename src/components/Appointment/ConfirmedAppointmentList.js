'use strict';
import React, { Component, PropTypes} from 'react';
import { TouchableHighlight, ListView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import {APP_STYLES} from './../../utils/AppStyles';

export default class ConfirmedAppointmentList extends Component {

  static propTypes = {
    appointments:PropTypes.object.isRequired,
    cancelAppointment:PropTypes.func.isRequired,
    followLocation:PropTypes.func.isRequired
  };

  renderRow(appointment) {
    const {followLocation} = this.props;
    const {company,employee,timing,pivot,service} = appointment;
    const appointmentDate = moment(appointment.date);
    const appointmentMonth = moment(appointmentDate).format('MMM');
    const appointmentDay = appointmentDate.date();

    if(appointment.isDeleted || !pivot) {return <View/>}

    return (
      <View style={styles.cellContainer}>
        <View style={styles.cellWrapper}>
          <View style={styles.leftCol}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Icon
                name='ios-calendar-outline'
                size={30}
                color={APP_STYLES.primaryColor}
                style={{width:30,height:30}}
              />
              <Text style={styles.month}>{appointmentMonth}</Text>
            </View>
            <Text style={styles.day}>{appointmentDay}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Icon
                name='ios-clock-outline'
                size={30}
                color={'black'}
                style={{width:30,height:30}}
              />
              <Text style={styles.time}>{timing.time_en}</Text>
            </View>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.company}>{service.name_en} at {company.name_en}</Text>
            <View style={{flex:1,flexWrap:'wrap',flexDirection:'row',paddingBottom:5}}>
              <Icon
                name='ios-pin-outline'
                size={20}
                color={'black'}
                style={{width:20,height:20,alignSelf:'center'}}
              />
              <Text style={styles.location} onPress={()=>followLocation(company)}>{company.address_en} - {company.city_en}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={styles.middleCol}>
                {employee && <Text style={styles.employee}>with {employee.name_en}</Text> }
              </View>

              <View style={styles.cancelContainer}>
                <TouchableHighlight onPress={()=>this.props.cancelAppointment(appointment)} underlayColor="transparent">
                  <View >
                    <Text style={styles.price}>{pivot.price | 0} KD</Text>
                    <View style={styles.cancelWrapper}>
                      <View style={{flex:2}}>
                        <Text style={styles.cancel} >cancel</Text>
                      </View>
                      <View style={{flex:1}}>
                        <Icon
                          name='ios-close-circle'
                          size={15}
                          color={'white'}
                          style={{width:15,height:15,fontWeight:'300'}}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </View>
    );

  }

  render() {
    console.log('reached confirmed appointment list');
    const {appointments} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = appointments ? ds.cloneWithRows(appointments) : ds.cloneWithRows([]);

    return (
      <ListView
        style={styles.container}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        contentInset={{bottom:49}}
        automaticallyAdjustContentInsets={false}
        ref='listView'
        enableEmptySections={true} //@todo remove this in future version
      />
    )
  }
}


var styles = StyleSheet.create({
  container: {
    flex:1,
    paddingVertical:10,
    paddingHorizontal:5
  },
  cellContainer:{
    backgroundColor:'white',
    opacity:0.6,
    marginBottom:10
  },
  cellWrapper: {
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    padding:10,
  },
  rightCol:{
    flex:2,
  },
  cancelContainer:{
    flex:1,
    alignSelf:'center'
  },
  middleCol:{
    flex:1.5,
  },
  leftCol:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  company: {
    fontSize:19,
    fontWeight:'500',
    paddingBottom:5
  },
  location: {
    flex:1,
    flexWrap:'wrap',
    fontSize:13,
    color:'black',
    textDecorationLine:'underline'
  },
  service: {
    fontSize:16,
    color:'#6ed3cf',
    paddingBottom:5
  },
  duration: {
    fontSize:10,
    color:'#06000a',
    paddingLeft:5
  },
  employee:{
    fontSize:13,
    color:'#c43235'
  },
  price: {
    fontSize:25,
    fontWeight:'500',
    textAlign:'center',
  },
  month: {
    paddingLeft:5,
    fontSize:19,
    fontWeight:'500',
  },
  time: {
    fontSize:15,
  },
  day: {
    fontSize:40
  },
  staff:{
    fontSize:12,
    alignSelf:'center',
    color:'gray'
  },
  cancelWrapper: {
    backgroundColor:'red',
    paddingTop:5,
    paddingBottom:5,
    flexDirection:'row',
    alignItems:'center'
  },
  cancel:{
    fontSize:13,
    paddingTop:3,
    paddingBottom:3,
    color:'white',
    textAlign:'center'
  },

});
