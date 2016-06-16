'use strict';
import React, {Component ,PropTypes} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ListView, Linking} from 'react-native';
import { Icon } from 'react-native-vector-icons/Ionicons';

export default class CompanyContact extends Component {

  static propTypes = {
    company:PropTypes.object.isRequired
  }

  loadLink(company,url) {
    switch(company) {
      case 'instagram' :
        return this.openLink(`instagram://user?username=${url}`);
      case 'facebook' :
        return this.openLink(`fb://profile/630026573700812`);
      case 'twitter' :
        return this.openLink(`twitter://user?screen_name=music`);
      case 'snapchat' :
        return this.openLink(`snapchat://add/jessicamalba`);
      default :
        return;
    }
  }

  openLink(url) {
    Linking.openURL(url);
  }

  render() {
    const {company} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Follow us</Text>
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.iconSection}>
            <TouchableOpacity onPress={()=>this.loadLink('instagram','pets')}>
              <View style={styles.iconWrapper}>
                <Icon
                  name='social-instagram-outline'
                  size={20}
                  color={'tomato'}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.loadLink('twitter','pets')}>
              <View style={styles.iconWrapper}>
                <Icon
                  name='social-twitter-outline'
                  size={20}
                  color={'tomato'}
                  style={styles.icon}
                />
              </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.loadLink('snapchat','pets')}>
              <View style={styles.iconWrapper}>
                <Icon
                  name='social-snapchat-outline'
                  size={20}
                  color={'tomato'}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.loadLink('facebook','pets')}>
              <View style={styles.iconWrapper}>
                <Icon
                  name='social-facebook-outline'
                  size={20}
                  color={'tomato'}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    )
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
    backgroundColor:'tomato',
    opacity:.8,
  },
  iconWrapper:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#e7e7e7',
    width:50,
    height:50,
    borderRadius:50,
    margin:5,

  },
  iconSection:{
    flexDirection:'row',
    alignItems:'center'
  },
  sectionWrapper:{
    padding:10,
    alignItems:'center',
  },
  sectionTitle:{
    flex:1,
    justifyContent:'center',
    fontWeight:'800',
    color:'white',
    fontSize:20
  },
  textView:{
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent:'center',
    alignItems:'center'
  },
  name: {
    color:'gray',
    fontSize:26,
    fontWeight:'600',
    alignSelf:'center',
    paddingTop:10,
    fontFamily:'SnellRoundhand'
  },
  icon:{
    width:20,
    height:20,
    alignSelf:'center',
  }

});
