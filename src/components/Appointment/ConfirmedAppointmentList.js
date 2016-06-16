'use strict';
import React, { Component, PropTypes} from 'react';
import { TouchableHighlight, ListView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import LoadingIndicator from './../../components/LoadingIndicator';
import Seperator from './../Seperator';

export default class ConfirmedAppointmentList extends Component {

  static propTypes = {
    appointments:PropTypes.object.isRequired,
    cancelAppointment:PropTypes.func.isRequired
  };

  renderRow(appointment) {
    const {company,employee,timing,pivot,service} = appointment;
    const appointmentDate = new Date(appointment.date);
    const month = appointmentDate.toLocaleString('en-us', { month: "short" });
    if(appointment.isDeleted) {return <View/>}
    return (
      <View style={styles.cellContainer}>
        <View style={styles.cellWrapper}>
          <View style={styles.leftCol}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Icon
                name='calendar'
                size={20}
                color={'red'}
                style={{width:20,height:20,alignSelf:'center',fontWeight:'100'}}
              />
              <Text style={styles.month}>{month}</Text>
            </View>
            <Text style={styles.day}>{appointmentDate.getDay()}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Icon
                name='clock'
                size={20}
                color={'#999999'}
                style={{width:20,height:20,alignSelf:'center',fontWeight:'100'}}
              />
              <Text style={{ paddingLeft:5,color:'#999999',fontWeight:'500',fontSize:13}}>{timing.time_en}</Text>
            </View>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.company}>{company.name_en}</Text>
            <View style={{flexDirection:'row',alignItems:'center',paddingBottom:5}}>
              <Icon
                name='location'
                size={15}
                color={'gray'}
                style={{width:15,height:15,alignSelf:'center'}}
              />
              <Text style={styles.location}>{company.city_en}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={styles.middleCol}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={styles.service}>
                    {service.name_en}
                  </Text>
                </View>
                {employee ? <Text style={styles.employee}>with {employee.name_en}</Text>  : <Text/>}

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
                          name='close-circled'
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
    const {appointments} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    let dataSource = appointments ? ds.cloneWithRows(appointments) : ds.cloneWithRows([]);

    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        contentInset={{bottom:49}}
        style={{paddingTop:64}}
        automaticallyAdjustContentInsets={false}
        ref='listView'
        enableEmptySections={true} //@todo remove this in future version
      />
    )
  }
}


var styles = StyleSheet.create({
  container: {},
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
    fontSize:16,
    color:'#300032',
    fontWeight:'500',
    paddingBottom:5
  },
  location: {
    fontSize:13,
    color:'black'
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
    fontSize:20,
    fontWeight:'700',
    textAlign:'center',
    paddingBottom:5
  },
  month: {
    paddingLeft:5,
    fontSize:17,
    fontWeight:'500',
    color:'gray'
  },
  time: {
    fontSize:11,
    color:'#98dafc'
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
