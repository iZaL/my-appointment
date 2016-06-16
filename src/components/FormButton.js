import React, { Component, PropTypes}  from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Button from 'react-native-button';

export default class FormButton extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    buttonText: PropTypes.string,
    containerStyle:View.propTypes.style,
    style:Text.propTypes.style
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          containerStyle={[styles.containerStyle,this.props.containerStyle]}
          disabled={this.props.disabled}
          onPress={this.props.onPress}
          style={[styles.style,this.props.style]}
          >
          {this.props.buttonText}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#5BC3BE',
    borderColor: '#5BC3BE',
    borderRadius: 0,

  },
  style: {
    fontSize: 18,
    color:'white',
    padding:10
  }
});