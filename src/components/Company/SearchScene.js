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
    opacity:0.8,
  },
  textInputWrapper:{
    flex:3
  },
  textInput:{
    height: 50,
    borderColor: '#E7E7E7',
    borderWidth: 1,
    padding:10,
    color:'white',
    borderRadius:20
  },
  searchButtonWrapper:{
    flex:1,
  }
});