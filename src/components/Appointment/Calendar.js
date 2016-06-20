'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class Calendar extends Component {

  render() {
    const {selectedDate,onDateChange} = this.props;
    return (
      <CalendarPicker
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        screenWidth={Dimensions.get('window').width}
      />
    );
  }

}
Calendar.propTypes = {
  onDateChange:PropTypes.func.isRequired,
  //selectedDate:PropTypes.string.isRequired
}