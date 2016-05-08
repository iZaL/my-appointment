import {API_ROOT} from './../../constants/config';
import { getUserToken } from './../../utils/storage';
import { normalize } from 'normalizr';
import { Schemas } from './../../utils/schema';

import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE
} from '../../constants/ActionTypes';

function categoryRequest() {
  return {
    type: CATEGORY_REQUEST
  }
}

function categorySuccess(payload) {
  return {
    type: CATEGORY_SUCCESS,
    entities:payload.entities
  }
}

function categoryFailure(error) {
  return {
    type: CATEGORY_FAILURE,
    error: error
  }
}


export function fetchCategory(categoryID, requiredFields = []) {

  return (dispatch,getState) => {

    const category = getState().entities.categories[categoryID];
    if (category && requiredFields.every(key => category.hasOwnProperty(key))) {
      return null
    }

    dispatch(categoryRequest());
    getUserToken().then((token) => {
        const url = API_ROOT + `/categories/${categoryID}/?api_token=${token}`;
        return fetch(url)
          .then(response => response.json())
          .then(json => {
            const normalized = normalize(json.data,Schemas.CATEGORY);
            dispatch(categorySuccess(normalized))
          })
      })
      .catch((err)=> {
        dispatch(categoryFailure(err))
      });
  }
}