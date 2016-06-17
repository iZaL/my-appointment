'use strict';
import React, { Component, PropTypes } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategory } from './../../actions/Category/category';
import { favoriteCompany } from './../../actions/favorites';
import { assets } from './../../utils/assets';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
import { Actions } from 'react-native-router-flux';

class Category extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchCategory(this.props.itemID,['companies']));
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

  render() {
    const {categoryReducer,companies} = this.props;
    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,paddingTop: 10,backgroundColor:'white'}}>
        {categoryReducer.isFetching && <LoadingIndicator /> }
        <CompanyList
          loadCompany={this.loadCompany}
          favoriteCompany={this.favoriteCompany}
          companies={companies}
        />
      </Image>
    );
  }
}

Category.propTypes = {
  dispatch: PropTypes.func.isRequired,
  itemID:PropTypes.number.isRequired,
  userReducer:PropTypes.object.isRequired
};

function mapStateToProps(state,ownProps) {
  const { entities,categoryReducer } = state;
  const category = entities.categories[ownProps.itemID];
  return {
    categoryReducer,
    companies:category.companies ? category.companies.map((company) => entities.companies[company]) : [],
    userReducer:state.userReducer
  }
}

export default connect(mapStateToProps)(Category);
