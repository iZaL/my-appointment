import {API_ROOT} from './../../constants/config';
import { Schemas } from './../../utils/schema';
import { normalize } from 'normalizr';
import isEmpty from 'lodash/isEmpty';

import {
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE
} from '../../constants/ActionTypes'

function categoriesRequest() {
  return {
    type: CATEGORIES_REQUEST,
  }
}

function categoriesSuccess(payload) {
  const normalized = normalize(payload.data,Schemas.CATEGORY_ARRAY);
  return {
    type: CATEGORIES_SUCCESS,
    entities:normalized.entities
  }
}

function categoriesFailure(error) {
  return {
    type: CATEGORIES_FAILURE,
    error: error
  }
}

export function fetchCategories() {

  const url = API_ROOT + '/categories';
  return function (dispatch,getState) {

    if(!isEmpty(getState().entities.categories)) {
      return;
    }

    dispatch(categoriesRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(categoriesSuccess(json));
      })
      .catch(error => dispatch(categoriesFailure(error)))
  };
}