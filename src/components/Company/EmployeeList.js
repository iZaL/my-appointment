'use strict';
import React, { PropTypes, Component } from 'react';
import { ScrollView, View, Text, TouchableHighlight, StyleSheet,ListView } from 'react-native';
import { Icon } from 'react-native-vector-icons/Ionicons';

export default class EmployeeList extends Component {

  renderRow(employee) {
    return (
      <ScrollView style={styles.cellContainer}>
        <TouchableHighlight onPress={() => this.props.onEmployeeSelect(employee)} underlayColor="transparent">
          <View style={styles.cellWrapper}>
            <View style={styles.leftCol}>
              <Icon
                name='person'
                size={24}
                color={'#e7e7e7'}
                style={styles.personIcon}
              />
            </View>
            <View style={styles.middleCol}>
              <Text style={styles.title}>
                {employee.name_en}
              </Text>
            </View>
            <View style={styles.rightCol}>
              <Icon
                name='chevron-right'
                size={24}
                color={'#e7e7e7'}
                style={styles.followIcon}
              />
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </ScrollView>
    );
  }

  render() {
    const {employees} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = employees ? ds.cloneWithRows(employees) : ds.cloneWithRows([]);
    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections={true} //@todo remove this in future version

      />
    )
  }
}

var styles = StyleSheet.create({
  cellContainer: {
    paddingTop:5,
    paddingBottom:5
  },
  cellWrapper: {
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    padding:10,
  },
  rightCol:{
  },
  middleCol:{
    flex:4,
    paddingLeft:10
  },
  leftCol:{
  },
  title: {
    fontSize: 15,
    color: '#636D69',
  },
  personIcon: {
    height:20,
    width:20,
    alignSelf:'flex-start'
  },
  followIcon: {
    height:20,
    width:20,
    alignSelf:'flex-end'
  },
  separator: {
    height:1,
    backgroundColor:'#f0f5f5',
  },

});

EmployeeList.propTypes = {
  employees:PropTypes.array.isRequired,
  onEmployeeSelect:PropTypes.func.isRequired
};