'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet,View,TouchableHighlight,Text,TextInput } from 'react-native';
import FormButton from './../FormButton';

export default class SearchScene extends Component {

  render() {
    const {updateSearchString,search,searchString} = this.props;
    // <View style={styles.searchButtonWrapper}>
    //   <FormButton
    //     onPress={()=>search()}
    //     buttonText='Search'
    //     containerStyle={{ height:50,paddingTop:5}}
    //   />
    // </View>
    return (
      <View style={styles.container}>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => updateSearchString(text)}
            value={searchString}
            placeholder="Search Companies by Name or Location"
            placeholderTextColor ="white"
            clearButtonMode="while-editing"
            returnKeyType="search"
            maxLength={30}
            autoCorrect={false}
            onSubmitEditing={()=>search()}
          />
        </View>
      </View>
    );
  }
}

SearchScene.propTypes = {
  search:PropTypes.func.isRequired,
  updateSearchString:PropTypes.func.isRequired,
  searchString:PropTypes.string.isRequired,
};

let styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    flexDirection:'row',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    marginBottom:10,
    marginTop:10,
  },
  textInputWrapper:{
    flex:3,
    backgroundColor:'#4d004d',
    padding:5,
    shadowColor:'#b300b3',
    shadowOffset:{width:0,height:0},
    shadowRadius:2,
    shadowOpacity:.8,
    borderRadius:2,
    opacity:.7

  },
  textInput:{
    height: 50,
    borderColor: '#33001a',
    borderWidth: 1,
    padding:10,
    color:'white',
    borderRadius:20,
    textAlign:'center',
    backgroundColor:'black',
    opacity:1
  },
  searchButtonWrapper:{
    flex:1,
  }
});