'use strict';
import React, { Component } from 'react';
import {Image } from 'react-native';
import { Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions } from 'react-native-router-flux';
import { APP_STYLES } from './utils/AppStyles';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Categories from './containers/Category/Categories';
import Category from './containers/Category/Category';
import Company from './containers/Company/Company';
import Appointment from './containers/Appointment/Appointment';
import Map from './containers/Company/Map';
import Settings from './containers/Settings/Settings';
import Favorites from './containers/User/Favorites';
import Appointments from './containers/User/Appointments';
import Search from './containers/Company/Search';
import Service from './containers/Service/Service';
import TabIcon from './components/TabIcon';
import LoginDialog from './components/LoginDialog';
import NavigationDrawer from './components/NavigationDrawer';
import IntroCarousel from './components/IntroCarousel';
import About from './components/About';
import Term from './components/Term';
import Profile from './containers/User/Profile';

export const scenes = Actions.create(

  <Scene key="modal" component={Modal} >
    <Scene key="root" hideNavBar={true} >
      <Scene key="tabbar" component={NavigationDrawer} >

        <Scene key="home" tabs={true} default="introCarousel"
               tabBarStyle={{ backgroundColor:APP_STYLES.primaryColor ,height:40}}
               tabBarSelectedItemStyle={{backgroundColor:APP_STYLES.primaryColor,height:40}}
               navigationBarStyle={{ backgroundColor:APP_STYLES.primaryColor }}
        >
          <Scene key="main"
                  icon={TabIcon}
                  selectedTabIcon="ios-home"
                  tabIcon="ios-home-outline"
                  navigationBarStyle={{ backgroundColor:APP_STYLES.primaryColor }}
                  titleStyle={{ color:'white' }}
          >
            <Scene key="categories" component={Categories} initial={true} hideNavBar={false} type="reset"/>
            <Scene key="categoryEntity" component={Category} />
            <Scene key="companyEntity" component={Company} />
            <Scene key="appointmentContainer" component={Appointment} />
          </Scene>

          <Scene key="maps" component={Map} icon={TabIcon}
                 title="Map"
                 selectedTabIcon="ios-map" tabIcon="ios-map-outline"
                 navigationBarStyle={{ backgroundColor:APP_STYLES.primaryColor }}
                 titleStyle={{ color:'white' }}
          />

          <Scene key="favorites" component={Favorites} icon={TabIcon} title="Favorites"
                 selectedTabIcon="ios-star" tabIcon="ios-star-outline"
                 navigationBarStyle={{ backgroundColor:APP_STYLES.primaryColor }}
                 titleStyle={{ color:'white' }}
          />

          <Scene key="appointments" component={Appointments}  icon={TabIcon} title="My Appointments"
                 selectedTabIcon="ios-alarm" tabIcon="ios-alarm-outline"
                 navigationBarStyle={{ backgroundColor:APP_STYLES.primaryColor }}
                 titleStyle={{ color:'white' }}

          />
          <Scene  key="settings" icon={TabIcon}  title="Settings"
                  selectedTabIcon="ios-settings" tabIcon="ios-settings-outline"
                  navigationBarStyle={{ backgroundColor:APP_STYLES.primaryColor }}
                  titleStyle={{ color:'white' }}
          >
            <Scene key="settingsScene" component={Settings} title="Settings"/>
            <Scene key="term" component={Term}  hideTabBar={true} hideNavBar={true} />
            <Scene key="profile" component={Profile}  hideTabBar={true} hideNavBar={true} />
            <Scene key="about" component={About} hideNavBar={true} />
          </Scene>

          <Scene key="serviceTab"
                 navigationBarStyle={{ backgroundColor:APP_STYLES.primaryColor }}
                 titleStyle={{ color:'white' }}
          >
            <Scene key="serviceEntity" component={Service} title="Service" clone />
          </Scene>

          <Scene key="search" component={Search} title="Search" hideNavBar={false}
                 navigationBarStyle={{ backgroundColor:APP_STYLES.primaryColor }}
                 titleStyle={{ color:'white' }}
          />

          <Scene key="login" component={Login} hideNavBar={true} />
          <Scene key="register" component={Register} hideNavBar={true} />
          <Scene key="loginDialog" component={LoginDialog} hideNavBar={true} />
          <Scene initial={true}  key="introCarousel" component={IntroCarousel}  hideTabBar={true} hideNavBar={true}/>
        </Scene>
      </Scene>
    </Scene>
  </Scene>
);
