'use strict';
import React, { Component, PropTypes } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchCategories } from './../../actions/Category/categories';
import { assets } from './../../utils/assets';
import CategoryList from './../../components/Category/CategoryList';
import LoadingIndicator from './../../components/LoadingIndicator';

class Categories extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchCategories());
  }

  loadCategory(category) {
    Actions.categoryEntity({
      title:category.name_en,
      itemID:category.id
    });
  }

  render() {
    const { categories,categoriesReducer } = this.props;
    return (
      <Image source={assets.lotus} style={{
        flex: 1,
        width:null,
        height:null,
        flexWrap:'wrap',
        backgroundColor:'white',
        paddingTop:64
      }}
      >
        {categoriesReducer.isFetching &&  <LoadingIndicator />}
        <CategoryList categories={categories} loadCategory={this.loadCategory}/>
      </Image>
    );
  }
}

function mapStateToProps(state) {
  const { entities,categoriesReducer } = state;
  return {
    categoriesReducer,
    categories:entities.categories ? entities.categories : []
  }
}

export default connect(mapStateToProps)(Categories);
