'use strict';
import React, { Component, PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { fetchService } from './../../actions/Service/service';
import { favoriteCompany } from './../../actions/favorites';
import { Actions } from 'react-native-router-flux';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';

class Service extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    //itemID:PropTypes.number.isRequired,
    userReducer:PropTypes.object.isRequired
  };

  componentDidMount() {
    const {dispatch} = this.props;
    if(this.props.itemID) {
      dispatch(fetchService(this.props.itemID,['companies']));
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
    if(!this.props.userReducer.isAuthenticated) {
      Actions.loginDialog({dialogText:'Please login to add to favorites'});
    } else {
      const {dispatch} = this.props;
      dispatch(favoriteCompany(company));
    }
  }

  render() {
    const {serviceReducer, companies } = this.props;
    return (
      <ScrollView style={{ flex:1,backgroundColor:'white' }} contentContainerStyle={{paddingTop: 64}} contentInset={{ bottom:50 }} >
        {serviceReducer.isFetching ? <LoadingIndicator /> : <View />}
        <CompanyList
          loadCompany={this.loadCompany.bind(this)}
          favoriteCompany={this.favoriteCompany.bind(this)}
          companies={companies}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state,ownProps) {
  const { serviceReducer,entities} = state;
  const service = entities.services[ownProps.itemID];

  return {
    serviceReducer,
    userReducer:state.userReducer,
    companies:service && service.companies ? service.companies.map((service) => entities.companies[service]) : [] ,
  }

}


export default connect(mapStateToProps)(Service);
