import React, { Component, PropTypes } from 'react';
import { StyleSheet,View,Text,Image,TouchableOpacity } from 'react-native';
import { assets } from './../utils/assets';
import FormButton from './../components/FormButton';
import Actions from 'react-native-router-flux';

export default class NoResult extends Component {

  static propTypes = {
    buttonText:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
    callback:PropTypes.func.isRequired
  }

  handleCallback() {
    console.log('called callback');
    return this.props.callback();
  }

  render() {
    console.log('called no result');

    return (
        <View style={styles.container}>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
          <Text style={styles.description}>
            {this.props.description}
          </Text>
          <FormButton
            onPress={this.handleCallback}
            buttonText='Browse Salons'
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'white',
    opacity:0.9,
    padding:20,
    marginTop:250,
    margin:10
  },

  title:{
    fontSize:16,
    padding:10,
    fontWeight:'600',
    textAlign:'center'
  },
  description: {
    paddingTop:10,
    paddingBottom:10
  },
  orText:{
    paddingBottom:10,
    paddingTop:20,
    textAlign:'center'
  },

  minFeatureText:{
    paddingTop:30,
    textDecorationLine:'underline',
    textAlign:'center'
  },
  button: {
    backgroundColor: '#5BC3BE',
    borderColor: '#5BC3BE',
    borderRadius: 0,
    opacity:1
  }
});