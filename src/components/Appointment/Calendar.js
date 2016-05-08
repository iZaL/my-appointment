'use strict';
import React, { PropTypes } from 'react';
import { Component, StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class Calendar extends Component {

  handleDateChange = (date) =>{
    this.props.onDateChange(date);
  };

  render() {
    const {selectedDate} = this.props;
    return (
      <CalendarPicker
        selectedDate={selectedDate}
        onDateChange={this.handleDateChange}
      />
    );
  }

}
Calendar.propTypes = {
  onDateChange:PropTypes.func.isRequired,
  //selectedDate:PropTypes.string.isRequired
}