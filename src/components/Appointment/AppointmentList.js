'use strict';
import React, {Component,PropTypes} from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingIndicator from './../../components/LoadingIndicator';
import Seperator from './../Seperator';
import { Actions } from 'react-native-router-flux';
import { APP_STYLES } from './../../utils/AppStyles';

export default class AppointmentList extends Component {

  render() {
    const {selectedEmployee,listEmployees,service} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.separator} />
        <View style={styles.cellWrapper}>
          <View style={styles.leftCol}>
            <Icon
              name='person'
              size={40}
              color={'white'}
              style={{width:40,height:40,alignSelf:'center',fontWeight:'100'}}
            />
          </View>
          <View style={styles.middleCol}>
            <Text style={styles.serviceName}>{service.name_en}</Text>
            <Text style={styles.price}>{service.pivot.price|0} KD</Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.staff}>Pick a Staff</Text>
            <TouchableHighlight onPress={()=>listEmployees()} underlayColor="transparent">
              <View style={styles.employeeSelectWrapper}>
                <View style={{flex:2}}>
                  <Text style={styles.employeeName} >{selectedEmployee.id ? selectedEmployee.name_en : 'Any'}</Text>
                </View>
                <View style={{flex:1}}>
                  <Icon
                    name='chevron-right'
                    size={15}
                    color={'white'}
                    style={{width:15,height:15,alignSelf:'flex-end',fontWeight:'300'}}
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

AppointmentList.propTypes = {
  service : PropTypes.object.isRequired,
  employeeName: PropTypes.string,
  listEmployees: PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  container: {
  },
  cellContainer:{
  },
  cellWrapper: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    padding:10,
  },
  rightCol:{
    flex:2
  },
  middleCol:{
    flex:1.5,
    paddingRight:10,
    paddingLeft:10,
  },
  leftCol:{
    flex:1,
    backgroundColor:'#e7e7e7',
    height:60,
    width:25,
    borderRadius:30,
    justifyContent:'center'
  },
  separator: {
    height:1,
    backgroundColor:'#f0f5f5',
  },
  serviceName: {
    fontSize:13,
    color:'#239077'
  },
  employeeSelectWrapper: {
    backgroundColor:APP_STYLES.primaryColor,
    padding:5,
    marginTop:10,
    flexDirection:'row',
    alignItems:'center'
  },
  employeeName:{
    fontSize:13,
    padding:3,
    fontWeight:'700',
    color:'white'
  },
  price:{
    fontSize:14,
    color:'gray'
  },
  time:{
    fontSize:11,
    color:'#084033'
  },
  staff:{
    fontSize:12,
    alignSelf:'center',
    color:'gray'
  },
  timingHeading: {
    justifyContent:'center',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10
  },
  timingLabel:{
    fontSize:15,
    color:'purple'
  },


});


