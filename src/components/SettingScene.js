import React, { Component, PropTypes} from 'react';
import { ListView,ScrollView, TouchableHighlight, StyleSheet, Text, View,AlertIOS } from 'react-native';
import { Icon } from 'react-native-vector-icons/Ionicons';

export default class SettingScene extends Component {

  render() {
    return (
      <View style={styles.cellContainer}>

        <View style={styles.separatorWrapper}>
          <View style={{flex:1}}/>
          <View style={styles.separator} />
        </View>

        <TouchableHighlight onPress={() => this.props.logout()} underlayColor='transparent'>
          <View style={styles.cellWrapper}>
            <View style={styles.leftCol}>
              <Icon
                name='ion|power'
                size={20}
                color={'red'}
                style={{width:20,height:20,alignSelf:'center',fontWeight:100}}
              />
            </View>
            <View style={styles.middleCol}>
              <Text>Logout</Text>
            </View>
            <View style={styles.rightCol}>
              <Icon
                name='ion|chevron-right'
                size={20}
                color={'#f0f5f5'}
                style={{width:20,height:20,alignSelf:'flex-end',fontWeight:'200'}}
              />
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.separatorWrapper}>
          <View style={{flex:1}}/>
          <View style={styles.separator} />
        </View>

      </View>

    );
  }
}

SettingScene.propTypes = ({
  logout:PropTypes.func.isRequired
});

var styles = StyleSheet.create({
  cellContainer:{
    marginTop:20,
    backgroundColor:'white',
  },
  cellWrapper: {
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'white',
    padding:10,
    borderColor:'white',
    borderBottomColor:'white'
  },
  rightCol:{
    flex:1,
  },
  middleCol:{
    flex:3,
    paddingRight:10,
    paddingLeft:10,
  },
  leftCol:{
    flex:1,
  },
  separatorWrapper:{
    flexDirection:'row',
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor: 'white',
  },
  separator: {
    height:0.5,
    backgroundColor:'#f0f5f5',
    flex:4
  }

});
