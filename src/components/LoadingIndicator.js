import React from 'react';
import { Component,ActivityIndicatorIOS,View } from 'react-native'

export default class LoadingIndicator extends Component {
  render() {
    return (
      <View style={[{flex: 1, justifyContent: 'center',alignItems: 'center',padding:10},this.props.style]}>
        <ActivityIndicatorIOS size="large" animating={true} color="purple" />
      </View>
    );
  }
}