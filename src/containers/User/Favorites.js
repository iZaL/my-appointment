'use strict';
import React, { Component, PropTypes } from 'react';
import { ScrollView, Image, View,RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { fetchFavorites,favoriteCompany } from './../../actions/favorites';
import { assets } from './../../utils/assets';
import CompanyList from './../../components/Company/CompanyList';
import NoResult from './../../components/NoResult';
import LoadingIndicator from './../../components/LoadingIndicator';
import { Actions } from 'react-native-router-flux';
import isEmpty from 'lodash/isEmpty';
class Favorites extends Component {

  constructor() {
    super();
    this.state={
      isRefreshing:false
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.favoriteCompany = this.favoriteCompany.bind(this)
    this.loadCompany = this.loadCompany.bind(this)
  }

  componentDidMount() {
    if(this.props.userReducer.isAuthenticated) {
      //  Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'})
      //} else {
      this.props.dispatch(fetchFavorites());
    }
  }

  loadCompany(company) {
    return Actions.companyEntity({
      title:company.name_en,
      itemID: company.id
    });
  }

  favoriteCompany(company) {
    this.props.dispatch(favoriteCompany(company));
  }

  onRefresh() {
    this.setState({isRefreshing: true});
    this.props.dispatch(fetchFavorites()).then((val)=>this.setState({isRefreshing: false}));
  }

  callback() {
    return Actions.main();
  }
  
  render() {
    console.log('render Favorites');
    const { userReducer,favorites } = this.props;

    return (
      <Image source={assets.nail} style={{flex:1,width: null,height: null,paddingTop:64,backgroundColor:'white'}}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom:40}}
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor="pink"
            title="Loading..."
            colors={['white', 'red', 'green']}
            progressBackgroundColor="yellow"
          />
        }
        >
          {userReducer.favorites.isFetching &&  <LoadingIndicator /> }

          {
            isEmpty(favorites) ?
              <NoResult
                title="No Favorites Yet"
                description="Favorite Salons and spas you know and you love"
                buttonText="Explore Salons"
                callback={this.callback}
              />
              :
              <CompanyList
                companies={favorites.filter((company)=>!company.unFavorited)}
                loadCompany={this.loadCompany}
                favoriteCompany={this.favoriteCompany}
              />
          }

        </ScrollView>

      </Image>
    );
  }
}

function mapStateToProps(state) {
  const { entities } = state;
  const user = entities.users[state.userReducer.authUserID];
  return {
    userReducer:state.userReducer,
    favorites: user && user.favorites ? user.favorites.map((companyID) => entities.companies[companyID] ) : []
  }
}

export default connect(mapStateToProps)(Favorites);
