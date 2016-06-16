'use strict';
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Image } from 'react-native';
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
    Actions.companyEntity({
      title:company.name_en,
      itemID: company.id
    });
  }

  favoriteCompany(company) {
      const {dispatch} = this.props;
      dispatch(favoriteCompany(company));
  }

  render() {
    const {serviceReducer, companies } = this.props;
    return (
      <Image source={require('./../../assets/img/bg.png')} style={{flex: 1,width: null,height: null,paddingTop: 10,backgroundColor:'white'}} >
        {serviceReducer.isFetching && <LoadingIndicator />  }
        <CompanyList
          loadCompany={this.loadCompany.bind(this)}
          favoriteCompany={this.favoriteCompany.bind(this)}
          companies={companies}
        />
      </Image>
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
