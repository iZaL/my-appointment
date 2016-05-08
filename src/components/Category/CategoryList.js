'use strict';

import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';
import { assets } from './../../utils/assets';
import LoadingIndicator from './../../components/LoadingIndicator';

export default class CategoryList extends Component {
  //
  static propTypes = ({
    categories : PropTypes.object.isRequired,
    categoriesReducer:PropTypes.object.isRequired,
    loadCategory:PropTypes.func.isRequired
  });

  renderHeader() {
    console.log(this.props);
    return this.props.categoriesReducer.isFetching && <LoadingIndicator />
  }

  renderRow(category) {
    var img = require(`./../../assets/img/clinic.png`);
    return (
      <TouchableHighlight onPress={() => this.props.loadCategory(category)} underlayColor="transparent">
        <View style={styles.row}>
          <Image source={img} underlayColor="transparent" style={{flex: 1,width: 75,height: 75,padding: 10,flexWrap:'wrap',backgroundColor:'white'}}/>
          <Text style={styles.text}> {category.name_en}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const {categories} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = categories ? ds.cloneWithRows(categories) : ds.cloneWithRows([]);

    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={false}
        enableEmptySections={true} //@todo remove this in future version
        ref='listView'
        contentInset={{top:64,bottom:50}}
        renderHeader={()=>this.renderHeader()}
      />
    )

  }
}

const styles = StyleSheet.create({
  list: {
    flex:1,
    backgroundColor:'white',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  row: {
    justifyContent: 'center',
    borderRadius:50,
    alignItems: 'center',
    marginBottom:15
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text: {
    alignSelf:'center',
    color:'black',
    fontSize:26,
    fontWeight:'800',
    fontFamily:'SnellRoundhand'
  },

});
