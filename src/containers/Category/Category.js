'use strict';
import React, {PropTypes}  from 'react';
import { Component, Image, View } from 'react-native';
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

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchCategory(this.props.itemID,['companies']));
  }

  loadCompany(company) {
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
    const {categoryReducer,companies} = this.props;
    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,paddingTop: 10,backgroundColor:'white'}}>
        {categoryReducer.isFetching ? <LoadingIndicator /> : <View />}
        <CompanyList
          loadCompany={this.loadCompany.bind(this)}
          favoriteCompany={this.favoriteCompany.bind(this)}
          companies={companies}
        />
      </Image>
    );
  }
}

Category.propTypes = {
  dispatch: PropTypes.func.isRequired,
  itemID:PropTypes.number.isRequired,
  userReducer:PropTypes.object.isRequired,
};

function mapStateToProps(state,ownProps) {
  const { entities,categoryReducer } = state;
  const category = entities.categories[ownProps.itemID];
  return {
    categoryReducer,
    companies:category && category.companies ? category.companies.map((company) => entities.companies[company]) : [] ,
    userReducer:state.userReducer
  }
}

export default connect(mapStateToProps)(Category);
