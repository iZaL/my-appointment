'use strict';
import React, { Component, PropTypes } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchCategories } from './../../actions/Category/categories';
import CategoryList from './../../components/Category/CategoryList';

class Categories extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  loadCategory(category) {
    Actions.categoryEntity({
      title:category.name_en,
      itemID:category.id
    });
  }

  render() {
    console.log('render categories');
    const { categories,categoriesReducer } = this.props;
    return (
      <Image style={{flex: 1,width: null,height: null,paddingTop: 64,backgroundColor:'white'}}
             source={require('./../../assets/img/bghome.png')}
      >
        <CategoryList
          categories={categories}
          loadCategory={this.loadCategory}
          categoriesReducer={categoriesReducer}
        />
      </Image>
    );
  }
}

function mapStateToProps(state) {
  const { entities,categoriesReducer } = state;
  return {
    categoriesReducer,
    categories:entities.categories && entities.categories
  }
}

export default connect(mapStateToProps)(Categories);
