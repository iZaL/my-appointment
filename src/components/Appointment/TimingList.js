'use strict';
import React, { Component,PropTypes } from 'react';
import { ListView,TouchableHighlight,StyleSheet,Text,View,AlertIOS } from 'react-native';
import LoadingIndicator from './../LoadingIndicator';
import Seperator from './../Seperator';
import { APP_STYLES } from './../../utils/AppStyles';

export default class TimingList extends Component {

  renderRow(time) {
    const {selectedTime} = this.props;
    return (
      <View style={[styles.cellContainer, selectedTime.id ?  (selectedTime.id == time.id ? styles.activeCell : '') : '']} key={time.id} >
        <TouchableHighlight onPress={()=>this.props.onTimeSelect(time)} underlayColor='transparent'>
          <View style={styles.cellWrapper}>
            <View style={styles.titleWrapper}>
              <Text style={styles.name}>
                {time.time_en}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <Seperator />
      </View>
    )
  }

  render() {
    const {timings,timingsReducer} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = timings ? ds.cloneWithRows(timings) : ds.cloneWithRows([]);
    return (
      <View >
        <Seperator />

        {timingsReducer.isFetching ? <LoadingIndicator style={{marginTop:10}}/> : <View/>}
        <ListView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          dataSource={dataSource}
          renderRow={(rowData, sec, i) => this.renderRow.bind(this)}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
          style={styles.container}
          enableEmptySections={true}
        />

      </View>
    );
  }

}

TimingList.propTypes = {
  timings:PropTypes.object.isRequired,
  timingsReducer:PropTypes.object.isRequired,
  selectedTime:PropTypes.object.isRequired,
  onTimeSelect:PropTypes.func.isRequired
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',
    marginBottom:20
  },
  cellContainer:{
    backgroundColor:'#e7e7e7',
    height:50,
    width:50,
    borderRadius:25,
    margin:5,
    marginTop:10,
    marginBottom:0
  },
  activeCell : {
    backgroundColor:APP_STYLES.primaryColor
  },
  cellWrapper: {
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    marginTop:10,
    marginBottom:10,
    alignItems:'center',
    paddingRight:5,
    paddingLeft:5
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
    color: 'white',
    fontSize:14,
    fontWeight:'700',
    textAlign:'center'

  },
  price: {
    textAlign:'right',
    color:'gray',
    fontSize:13
  },
  bookButtonWrapper:{
    flexDirection:'row',
    marginLeft:10,
    justifyContent:'center',
    padding:4,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:2,
    backgroundColor:'blue',

  },
  bookButton: {
    color:'white',
    textAlign:'right',
    fontSize:12,
    alignSelf:'center',
    paddingLeft:3
  },
  separator: {
    height:1,
    backgroundColor:'#E8E8E8'
  },
  calendarIcon :{
    height:20,
    width:20
  },


});
