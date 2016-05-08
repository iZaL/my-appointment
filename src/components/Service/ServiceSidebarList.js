'use strict';
import React, { PropTypes, Component } from 'react';
import { ScrollView, Image, StyleSheet, Text, TouchableHighlight, View, ListView } from 'react-native';
import { Icon } from 'react-native-icons';

export default class ServiceSidebarList extends Component {

  static propTypes= {
    loadService:PropTypes.func.isRequired,
    //services:PropTypes.object.isRequired
  };

  renderRow(service) {
    return (
      <View style={styles.cellContainer}>
        <TouchableHighlight onPress={() => this.props.loadService(service)} underlayColor='transparent'>
          <View style={styles.cellWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.name}>
                {service.name_en}
              </Text>
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
      <ScrollView style={styles.container} >
        <Text style={styles.sectionHeader}>Select Service</Text>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true} //@todo remove this in future version
        />
      </ScrollView>

    )

  }

}

ServiceSidebarList.propTypes= {
  services:PropTypes.array.isRequired
}

var styles = StyleSheet.create({
  container: {
    margin:5
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
    color:'#ecf2f9',
    fontSize:20,
    opacity:.9
  },
  separator: {
    height:1,
    backgroundColor:'#E8E8E8',
    opacity:.1
  },
  calendarIcon :{
    height:20,
    width:20
  },
  sectionHeader: {
    color:'gray'
  },

});
