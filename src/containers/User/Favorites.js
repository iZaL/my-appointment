'use strict';
import React from 'react';
import { Component, ScrollView, Image, View,RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { fetchFavorites,favoriteCompany } from './../../actions/favorites';
import { assets } from './../../utils/assets';
import CompanyList from './../../components/Company/CompanyList';
import NoResult from './../../components/NoResult';
import LoadingIndicator from './../../components/LoadingIndicator';
import { Actions } from 'react-native-router-flux';
import isEmpty from 'lodash/isEmpty';
class Favorites extends Component {

  constructor(props) {
    super(props);
    this.state={
      isRefreshing:false
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    if(this.props.userReducer.isAuthenticated) {
      //  Actions.loginDialog({dialogText:'Please Login to view and manage your Favorites'})
      //} else {
      this.props.dispatch(fetchFavorites());
    }
  }

  loadCompany(company) {
    Actions.main();
    Actions.companyEntity({
      title:company.name_en,
      itemID: company.id
    });
  }

  favoriteCompany(company) {
    //console.log('wa');
    const {dispatch} = this.props;
    dispatch(favoriteCompany(company));
  }

  onRefresh() {
    this.setState({isRefreshing: true});
    this.props.dispatch(fetchFavorites()).then((val)=>this.setState({isRefreshing: false}));
  }

  render() {
    const { userReducer,favorites } = this.props;

    return (
      <Image source={assets.nail} style={{flex:1,width: null,height: null,backgroundColor:'white'}}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentInset={{bottom:40}}
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor="white"
            title="Loading..."
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
        >
          {userReducer.favorites.isFetching &&  <LoadingIndicator /> }

          {
            isEmpty(favorites) &&
            <NoResult
              title="No Favorites Yet"
              description="Favorite Salons and spas you know and you love"
              buttonText="Explore Salons"
              callback={()=>Actions.main()}
            />
          }

          <CompanyList
            companies={favorites.filter((company)=>!company.unFavorited)}
            loadCompany={this.loadCompany.bind(this)}
            favoriteCompany={this.favoriteCompany.bind(this)}
          />
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
