import React, { PropTypes, Component } from 'react';
import { ScrollView, TouchableHighlight, StyleSheet, Text, View, AlertIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SettingsCell extends Component {

  static propTypes = {
    callback:PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
  };

  render() {
    const {callback,icon,title,name} = this.props;
    return (
        <View style={styles.container}>
          <TouchableHighlight onPress={() => callback(name)} underlayColor='transparent'>
            <View style={styles.cellWrapper}>
              <View style={styles.leftCol}>
                <Icon
                  name={icon}
                  size={26}
                  color={'tomato'}
                  style={{width:26,height:26,alignSelf:'center',fontWeight:'100'}}
                />
              </View>
              <View style={styles.middleCol}>
                <Text>{title}</Text>
              </View>
              <View style={styles.rightCol}>
                <Icon
                  name='ios-arrow-forward'
                  size={20}
                  color={'#f0f5f5'}
                  style={{width:20,height:20,alignSelf:'flex-end',fontWeight:'200'}}
                />
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.separator} />
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
  },
  cellWrapper: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    padding:10,
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
    backgroundColor:'#f0f5f5',
    height:1
  }

});
