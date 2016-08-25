import React, { PropTypes, Component } from 'react';
import { ScrollView, StyleSheet,View,Text,TouchableHighlight,Image } from 'react-native';
import { Actions } from "react-native-router-flux";
import { assets } from './../utils/assets';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchServices } from './../actions/Service/services';
import { connect } from 'react-redux';
import ServiceSidebarList from './../components/Service/ServiceSidebarList';

class SideMenu extends Component {

  componentWillMount() {
    const { dispatch } =this.props;
    dispatch(fetchServices());
  }

  loadService(service) {
    const drawer = this.context.drawer;
    drawer.close();
    Actions.serviceEntity({
      title:service.name_en,
      itemID:service.id
    });
  }

  render(){
    const drawer = this.context.drawer;
    const { services } = this.props;
    return (
      <Image source={assets.bgblurblue} style={{flex: 1,width: null,height: null,paddingTop: 10,backgroundColor:'white'}}>
        <View style={[styles.container, this.props.sceneStyle]}>
          <View style={styles.list}>
            <View style={styles.titleWrapper}>
              <Icon
                name='ios-search'
                size={20}
                color={'#ecf2f9'}
                style={styles.rightArrow}
              />

              <Text style={styles.title} onPress={() => {drawer.close();Actions.search();}}>Search</Text>
            </View>
            <View style={styles.arrowWrapper}>
              <Icon
                name='ios-arrow-forward'
                size={20}
                color={'#a6a6a6'}
                style={styles.rightArrow}
              />
            </View>
          </View>
          <View style={styles.seperator} />

          <ServiceSidebarList services={services} loadService={this.loadService.bind(this)} />
        </View>
      </Image>
    );
  }
}

SideMenu.contextTypes = {
  drawer: React.PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding:10,
  },
  closeButton:{
    width:20,
    height:20,
    alignSelf:'flex-end'
  },
  list:{
    paddingTop:20,
    flexDirection:'row',
    alignItems:'center',
  },
  titleWrapper:{
    flex:3,
    flexDirection:'row',
    alignItems:'center'
  },
  title: {
    color:'#ecf2f9',
    fontSize:20,
    paddingLeft:5
  },
  arrowWrapper: {
    flex:1,
    alignItems:'flex-end',
  },
  rightArrow: {
    height:20,
    width:20,
  },
  seperator:{
    marginTop:10,
    marginBottom:10,
    backgroundColor:'#204060',
    height:0.5
  },

  serviceListWrapper: {
  }
});


function mapStateToProps(state,ownProps) {
  const { entities } = state;
  const services = entities.services ? entities.services : [];
  return {
    userReducer:state.userReducer,
    services:services
  }
}

export default connect(mapStateToProps)(SideMenu)
