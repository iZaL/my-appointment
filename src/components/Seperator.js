import React from 'react';
import { View } from 'react-native';

var Seperator = React.createClass({

  render() {
    return (
      <View style={[{height:1, backgroundColor:'#E8E8E8'},this.props.style]}/>
    );
  }
});

module.exports = Seperator;
