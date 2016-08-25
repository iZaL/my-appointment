import React, { Component, PropTypes } from 'react';
import { StyleSheet,View,Text,Image,TouchableOpacity } from 'react-native';
import FormButton from './../components/FormButton';

export default class NoResult extends Component {

  static propTypes = {
    buttonText:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
    callback:PropTypes.func.isRequired
  };

  render() {
    const { title,description,buttonText,callback} = this.props;

    return (
        <View style={styles.container}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.description}>
            {description}
          </Text>
          <FormButton
            onPress={callback}
            buttonText={buttonText}
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