'use strict';
import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const CalendarPicker = require('react-native-calendar-picker');

export default class ServiceItem extends Component {

  renderContent() {
    return (
      <View style={styles.container}>
      </View>
    );
  }

  render() {
    const {service} = this.props;
    if (service.id && service.id > 0) {
      return this.renderContent(service);
    }
    return <View/>;
  }

}

var styles = StyleSheet.create({
  container: {
  },
  selectedDate: {
  }
});
