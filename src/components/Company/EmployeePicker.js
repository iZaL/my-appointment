'use strict';
import React, { PropTypes } from 'react';
import { Component,ListView,ScrollView, TouchableHighlight, StyleSheet, Text, View,AlertIOS } from 'react-native';
import { Icon } from 'react-native-icons';
import LoadingIndicator from './../LoadingIndicator';
const Actions = require('react-native-router-flux').Actions;
const Modal = require('react-native-modalbox');
import EmployeeList from './EmployeeList';

export default class EmployeePicker extends Component {

  static propTypes = {
    employees:PropTypes.array.isRequired,
    onEmployeeSelect:PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.showEmployeeListModal) {
      this.refs.employeeListModal.open();
    } else {
      this.refs.employeeListModal.close();
    }
  }

  render() {
    const {employees,onEmployeeSelect} = this.props;
    return(
      <Modal
        backdrop={true} backdropOpacity={0.7} backdropColor="black"
        position="center"
        style={styles.container}
        ref={"employeeListModal"}
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
        <EmployeeList
          employees={employees}
          onEmployeeSelect={onEmployeeSelect}
        />
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    justifyContent:'flex-start',
    height:300,
    width:350,
    paddingRight:10,
    paddingLeft:10
  },
  closeButton:{
    width:20,
    height:20,
    alignSelf:'flex-end',
    paddingTop:150,
    margin:10
  }
});


