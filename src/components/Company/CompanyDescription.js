'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet,View,Text } from 'react-native';

export default class CompanyDescription extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.company.description_en}
        </Text>
        <Text>
          {this.props.company.phone}
        </Text>
      </View>
    );
  }
}

CompanyDescription.propTypes = {
  company:PropTypes.object.isRequired,
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:5
  }
});