'use strict';
import React, { Component, PropTypes } from 'react';
import { Image, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchCategory } from './../../actions/Category/category';
import { favoriteCompany } from './../../actions/favorites';
import { assets } from './../../utils/assets';
import CompanyList from './../../components/Company/CompanyList';
import LoadingIndicator from './../../components/LoadingIndicator';
import { Actions } from 'react-native-router-flux';
import AlphabetListView from 'react-native-alphabetlistview';


// class SectionHeader extends Component {
//   render() {
//     // inline styles used for brevity, use a stylesheet when possible
//     var textStyle = {
//       textAlign:'center',
//       color:'#fff',
//       fontWeight:'700',
//       fontSize:16,
//       padding:5,
//     };
//
//     var viewStyle = {
//       backgroundColor: '#ccc',
//     };
//     return (
//       <View style={viewStyle}>
//         <Text style={textStyle}>{this.props.title}</Text>
//       </View>
//     );
//   }
// }
//
// class SectionItem extends Component {
//   render() {
//     return (
//       <View style={{ flex:1,paddingLeft:5,paddingRight:5,backgroundColor:'black',opacity:0.8,width:25,alignSelf:'center',justifyContent:'flex-end'}}>
//         <Text style={{color:'white',fontWeight:'500'}}>{this.props.title}</Text>
//       </View>
//     );
//   }
// }
//
// class Cell extends Component {
//   render() {
//     return (
//       <View style={{height:30, paddingLeft:5,opacity:0.8}}>
//         <Text style={{ fontSize:17, }} >{this.props.item}</Text>
//       </View>
//     );
//   }
// }

class Category extends Component {

  constructor() {
    super();
    this.favoriteCompany = this.favoriteCompany.bind(this);
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
    // <AlphabetListView
    //   contentInset={{ top:64, bottom:40 }}
    //   data={companies}
    //   cell={Cell}
    //   cellHeight={30}
    //   sectionListItem={SectionItem}
    //   sectionHeader={SectionHeader}
    //   sectionHeaderHeight={22.5}
    //   enableEmptySections={true}
    // />

    const {categoryReducer,companies} = this.props;

    return (
      <Image source={assets.bg} style={{flex: 1,width: null,height: null,backgroundColor:'white'}}>
        { categoryReducer.isFetching && <LoadingIndicator /> }
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
  itemID:PropTypes.number.isRequired,
  userReducer:PropTypes.object.isRequired
};

const getCategory = (state,props) => state.entities.categories[props.itemID];
const getEntities = (state,props) => state.entities;

const getCompanies = createSelector(
  [ getCategory,getEntities ],
  ( category,entities ) => {
    // return category.companies ? alphabetize(category.companies.map((company) => entities.companies[company])) : []
    return category.companies ? category.companies.map((company) => entities.companies[company]) : []
  }
);

// const alphabetsArray = {
//   A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],
//   L:[],M:[],N:[],O:[],P:[],Q:[],R:[],S:[],T:[],U:[],V:[],
//   W:[],X:[],Y:[],Z:[]
// };
//
// const alphabetize = (companies) => {
//   let companyFirstChar;
//   companies.map((company)=> {
//     companyFirstChar = company.name_en.charAt(0).toUpperCase();
//     alphabetsArray[companyFirstChar].push(company.name_en);
//   });
//   return alphabetsArray;
// };

function mapStateToProps(state,ownProps) {
  return {
    categoryReducer:state.categoryReducer,
    userReducer:state.userReducer,
    companies:getCompanies(state,ownProps)
  }
}

export default connect(mapStateToProps)(Category);
