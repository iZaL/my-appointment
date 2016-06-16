'use strict';
import React, { Component, PropTypes } from 'react';
import { View, Image,Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { assets } from './../../utils/assets';
import CategoryList from './../../components/Category/CategoryList';
import LoadingIndicator from './../../components/LoadingIndicator';
import { Actions } from 'react-native-router-flux';
import {Record} from 'immutable';
import {API_ROOT} from './../../constants/config';
import { normalize, Schema, arrayOf,valuesOf,unionOf } from 'normalizr';
const category = new Schema('categories');
const company = new Schema('companies');
const user = new Schema('users');
const service = new Schema('services');
const employee = new Schema('employees');
const timing = new Schema('timings');
const appointment = new Schema('appointments');

category.define({
  companies: arrayOf(company)
});

company.define({
  favorites:arrayOf(user),
  services:arrayOf(service),
  employees:arrayOf(employee)
});

appointment.define({
  user:user,
  company:company,
  employee:employee,
  timing:timing,
  service:service
});

user.define({
  favorites:arrayOf(company),
});

class Test extends Component {

  constructor(props) {
    super(props);
    this.fetchCategories = this.fetchCategories.bind(this);
  }


  categoriesSuccess(payload) {
    return {
      type: 'CATEGORIES_SUCCESS',
      entities: normalize(payload.data,category),
      collection:payload.data
    }
  }

  fetchCategories() {
    const url = API_ROOT + '/categories';
    return function (dispatch) {
      return fetch(url)
        .then(response => response.json())
        .then(response => {
          const normalized = normalize(response.data,arrayOf(category));
          return dispatch({
            type: 'CATEGORIES_SUCCESS',
            entities: normalized.entities,
            collection:normalized.result
          })
        })
        .catch(error => {console.log(error)})
    };
  }

  fetchCategory(id) {
    const url = API_ROOT + '/categories/'+id;
    return function (dispatch) {
      return fetch(url)
        .then(response => response.json())
        .then(response => {
          const normalized = normalize(response.data,category);
          console.log('normalized',normalized);
          return dispatch({
            type: 'CATEGORY_SUCCESS',
            entities: normalized.entities,
            entity:normalized.result
          })
        })
        .catch(error => {console.log(error)})
    };
  }


  fetchFavorites() {
    const url = API_ROOT + '/favorites?api_token=q3Q0l0A6cPLdfIetpn7ZmKf6TQ1jGr8OvfUOE1QMNI8pEWlknz8dwtHf33Qy';
    return function (dispatch) {
      return fetch(url)
        .then(response => response.json())
        .then(response => {
          const normalized = normalize(response.data,user);
          console.log('normalized',normalized);
          return dispatch({
            type: 'FAVORITES_SUCCESS',
            entities: normalized.entities,
            collection:normalized.result
          })
        })
        .catch(error => {console.log(error)})
    };
  }


  fetchAppointments() {
    const url = API_ROOT + '/appointments?api_token=q3Q0l0A6cPLdfIetpn7ZmKf6TQ1jGr8OvfUOE1QMNI8pEWlknz8dwtHf33Qy';
    return function (dispatch) {
      return fetch(url)
        .then(response => response.json())
        .then(response => {
          const normalized = normalize(response.data,arrayOf(appointment));
          return dispatch({
            type: 'APPOINTMENTS_SUCCESS',
            entities: normalized.entities,
            collection:normalized.result
          })
        })
        .catch(error => {console.log(error)})
    };
  }

  fetchCompany(id) {
    const url = API_ROOT + '/companies/'+id+'/show';
    return function (dispatch) {
      return fetch(url)
        .then(response => response.json())
        .then(response => {
          const normalized = normalize(response.data,company);
          return dispatch({
            type: 'COMPANY_SUCCESS',
            entities: normalized.entities,
            entity:normalized.result
          })
        })
        .catch(error => {console.log(error)})
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    Promise.all([
      dispatch(this.fetchCategories()),
      dispatch(this.fetchCategory(1)),
      dispatch(this.fetchCompany(1)),
      dispatch(this.fetchAppointments()),
      dispatch(this.fetchFavorites()),
    ]);
  }

  render() {
    const {entities} = this.props;

    return (
      <View style={{ paddingTop:65}}>
        { Object.keys(entities.categories).forEach((cat)=> {
            { console.log(entities.categories[cat].name_en)}
            return (
              <Text style={{ color:'green'}}>asdasdas asdsad</Text>
            )
          }
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    entities:state.entities,
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Test);
