import React, { PropTypes } from 'react';
import { StyleSheet,View,Text,Image,Component } from 'react-native';
import { assets } from './../utils/assets';
import FormButton from './../components/FormButton';

const Actions = require('react-native-router-flux').Actions;

export default class LoginDialog extends Component {

  render() {
    return (
      <Image source={assets.bg} style={styles.container}>
        <View style={styles.dialogWrapper}>
          <Text style={styles.dialogText}>
            {this.props.dialogText}
          </Text>
          <FormButton
            onPress={()=>Actions.login()}
            buttonText='Login'
          />
          <Text style={styles.orText}>
            Don't have an account ?
          </Text>
          <FormButton
            onPress={()=>Actions.register()}
            buttonText='Sign up now !'
          />
          <Text style={styles.minFeatureText} onPress={()=>Actions.main()}>
            Browse the site with limited features
          </Text>
        </View>
      </Image>
    );
  }
}

LoginDialog.propTypes = ({
  dialogText:PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 10,
    justifyContent:'center',
  },

  dialogWrapper:{
    backgroundColor:'white',
    opacity:0.9,
    padding:20,
    paddingTop:50,
    paddingBottom:50,
  },

  dialogText:{
    fontSize:16,
    padding:10,
    textAlign:'center'
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