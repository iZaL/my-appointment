'use strict';
import React, { Component } from 'react';
import { Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions } from 'react-native-router-flux';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Categories from './containers/Category/Categories';
import Test from './containers/Category/Test';
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

export const scenes = Actions.create(
  <Scene key="root" component={Modal} >
    <Scene key="tabbar" component={NavigationDrawer} >

      <Scene key="home" tabs={true} default="introCarousel"
             tabBarStyle={{
              backgroundColor:'#99ddff' ,
              height:40
             }}
             navigationBarStyle={{ backgroundColor:'#99ddff' }}
      >
        <Scene key="main"
               icon={TabIcon}
               selectedTabIcon="ion|ios-home"
               tabIcon="ion|ios-home-outline"
               navigationBarStyle={{ backgroundColor:'#99ddff' }}
               titleStyle={{ color:'white' }}
        >
          <Scene key="categories" component={Categories} initial={true} hideNavBar={false} rightTitle="intro" onRight={() => Actions.introCarousel()} />
          <Scene key="categoryEntity" component={Category} />
          <Scene key="companyEntity" component={Company} />
          <Scene key="appointmentContainer" component={Appointment} />
        </Scene>

        <Scene key="maps" component={Map} icon={TabIcon}
               selectedTabIcon="ion|ios-location" tabIcon="ion|ios-location-outline"
               hideNavBar={true}
        />

        <Scene key="favorites" component={Favorites} icon={TabIcon} title="Favorites"
               selectedTabIcon="ion|android-favorite" tabIcon="ion|android-favorite-outline"
               navigationBarStyle={{ backgroundColor:'#99ddff' }}
               titleStyle={{ color:'white' }}
               hideNavBar={true}
        />

        <Scene key="appointments" component={Appointments}  icon={TabIcon} title="Appointments"
               selectedTabIcon="ion|ios-alarm" tabIcon="ion|ios-alarm-outline"
               navigationBarStyle={{ backgroundColor:'#99ddff' }}
               titleStyle={{ color:'white' }}
               hideNavBar={true}

        />
        <Scene key="settings" component={Settings} icon={TabIcon}  title="Settings"
               selectedTabIcon="ion|ios-gear" tabIcon="ion|ios-gear-outline"
               navigationBarStyle={{ backgroundColor:'#99ddff' }}
               titleStyle={{ color:'white' }}
        />

        <Scene key="serviceTab"
               navigationBarStyle={{ backgroundColor:'#99ddff' }}
               titleStyle={{ color:'white' }}
        >
          <Scene key="serviceEntity" component={Service} title="Service" type="reset"/>
        </Scene>

        <Scene key="search" component={Search} title="search" hideNavBar={false}
               navigationBarStyle={{ backgroundColor:'#99ddff' }}
               titleStyle={{ color:'white' }}
        />

        <Scene key="login" component={Login} hideNavBar={true} />
        <Scene key="register" component={Register} hideNavBar={true} />
        <Scene key="loginDialog" component={LoginDialog} hideNavBar={true} />
        <Scene initial={true} key="introCarousel" component={IntroCarousel} hideTabBar={true} hideNavBar={true}/>
      </Scene>
    </Scene>

  </Scene>
);
