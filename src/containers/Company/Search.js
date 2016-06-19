import React, { PropTypes, Component } from 'react';
import { ScrollView, StyleSheet,View,Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { searchCompany  } from './../../actions/Company/company';
import { favoriteCompany } from './../../actions/favorites';
import SearchScene from './../../components/Company/SearchScene';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
import { assets } from './../../utils/assets';

class Search extends  Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userReducer:PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state= {
      searchString : ''
    };

    this.favoriteCompany = this.favoriteCompany.bind(this);
    this.search = this.search.bind(this);
    this.updateSearchString = this.updateSearchString.bind(this);
  }

  search() {
    this.props.dispatch(searchCompany(this.state.searchString));
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

  updateSearchString(value) {
    this.setState({
      searchString:value
    });
  }

  render() {

    const { companies,companyReducer } = this.props;
    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,paddingTop: 64,backgroundColor:'white'}}>
          <SearchScene search={this.search} searchString={this.state.searchString} updateSearchString={this.updateSearchString} />
          { companyReducer.isSearching && <LoadingIndicator />}
          <CompanyList
            loadCompany={this.loadCompany}
            favoriteCompany={this.favoriteCompany}
            companies={companies}
          />
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    paddingTop:64
  }
});

function mapStateToProps(state) {
  const companyReducer = state.companyReducer;
  const searchResults = companyReducer.searchResults ? companyReducer.searchResults : [];
  const companies = state.entities.companies;
  return {
    companyReducer:companyReducer,
    userReducer:state.userReducer,
    companies: searchResults ? searchResults.map((companyID) => companies[companyID]) : []
  }
}

export default connect(mapStateToProps)(Search);
