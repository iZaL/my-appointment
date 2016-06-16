'use strict';
import React, { Component, PropTypes } from 'react';
import { StyleSheet,View,TouchableHighlight,Text,TextInput } from 'react-native';
import { Icon } from 'react-native-vector-icons/Ionicons';
import FormButton from './../FormButton';

export default class SearchScene extends Component {

  constructor(props) {
    super(props);
    this.state= {
      searchString : ''
    }
  }

  doSearch() {
    //alert('searching'+this.state.searchString);
    this.props.search(this.state.searchString);
    // update search
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({searchString:text})}
            value={this.state.searchString}
            placeholder="Search company by name or location"
            clearButtonMode="while-editing"
            returnKeyType="search"
            maxLength={30}
            autoCorrect={false}
            onSubmitEditing={()=>this.doSearch()}
          />
        </View>
        <View style={styles.searchButtonWrapper}>
          <FormButton
            onPress={()=>this.doSearch()}
            buttonText='Search'
            containerStyle={{ height:50,paddingTop:5}}
          />
        </View>
      </View>
    );
  }
}

SearchScene.propTypes = {
  search:PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    flexDirection:'row',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5
  },
  textInputWrapper:{
    flex:3
  },
  textInput:{
    height: 50,
    borderColor: '#E7E7E7',
    borderWidth: 1,
    padding:10,
  },
  searchButtonWrapper:{
    flex:1,
  }
});