'use strict';
import React, { Component, PropTypes } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';
import { Icon } from 'react-native-icons';
import { APP_STYLES } from './../../utils/AppStyles';

export default class ServiceList extends Component {

  renderRow(service) {
    return (
      <View style={styles.cellContainer}>
        <TouchableHighlight onPress={() => ''} underlayColor='transparent'>
          <View style={styles.cellWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.name}>
                {service.name_en}
              </Text>
            </View>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>
                {service.pivot.price ? service.pivot.price|0 : '-'} KD
              </Text>
              <TouchableHighlight onPress={() => this.props.loadDateTime(service)} underlayColor='transparent'>
                <View style={styles.bookButtonWrapper} >
                  <Icon
                    name='ion|calendar'
                    size={20}
                    color='white'
                    style={styles.calendarIcon}
                  />
                  <Text style={styles.bookButton}>
                    Book
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.separator}/>
      </View>
    )
  }

  render() {
    const {services} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = services ? ds.cloneWithRows(services) : ds.cloneWithRows([]);

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        automaticallyAdjustContentInsets={false}
        style={styles.container}
        enableEmptySections={true} //@todo remove this in future version
      />
    )

  }

}

ServiceList.propTypes= {
  services:PropTypes.array.isRequired
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',
    margin:10
  },
  cellContainer:{
  },
  cellWrapper: {
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    marginTop:10,
    marginBottom:10,
    alignItems:'center'
  },
  titleWrapper: {
    justifyContent:'flex-start',
    flex:2,
  },
  priceWrapper:{
    justifyContent:'flex-end',
    flexDirection:'row',
    flex:1,
    alignItems:'center'
  },
  name: {
    color: '#000000',
    fontSize:20
  },
  price: {
    textAlign:'right',
    color:'gray',
    fontSize:13
  },
  bookButtonWrapper:{
    flexDirection:'row',
    marginLeft:10,
    backgroundColor:APP_STYLES.primaryColor,
    justifyContent:'center',
    padding:4,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:2
  },
  bookButton: {
    color:'white',
    textAlign:'right',
    fontSize:12,
    alignSelf:'center',
    paddingLeft:3,
    fontWeight:'700'
  },
  separator: {
    height:1,
    backgroundColor:'#E8E8E8'
  },
  calendarIcon :{
    height:20,
    width:20
  }

});
