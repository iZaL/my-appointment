import { API_ROOT } from './../../constants/config';
import { normalize } from 'normalizr';
import { Schemas } from './../../utils/schema';
import { getUserToken } from './../../utils/storage';

import {
  COMPANY_REQUEST,
  COMPANY_SUCCESS,
  COMPANY_FAILURE,
  COMPANY_SEARCH_REQUEST,
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_FAILURE,
  SET_COMPANY_SERVICE
} from '../../constants/ActionTypes';

function companyRequest() {
  return {
    type: COMPANY_REQUEST
  }
}

function companySuccess(payload) {
  const normalized = normalize(payload.data,Schemas.COMPANY);
  return {
    type: COMPANY_SUCCESS,
    entities: normalized.entities
  }
}

function companyFailure(error) {
  return {
    type: COMPANY_FAILURE,
    error: error
  }
}

export function fetchCompany(companyID,requiredFields=[]) {
  const url = `${API_ROOT}/companies/${companyID}/show`;
  return (dispatch,getState) => {

    const company = getState().entities.companies[companyID];
    if (company && requiredFields.every(key => company.hasOwnProperty(key))) {
      return null
    }
    dispatch(companyRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(companySuccess(json))
      })
      .catch((err)=> {
        dispatch(companyFailure(err))
      })
  }
}

function searchSuccess(normalized) {
  return {
    type: COMPANY_SUCCESS,
    entities: normalized.entities
  }
}

function setSearchResult(normalized) {
  return {
    type: COMPANY_SEARCH_SUCCESS,
    result: normalized.result
  }
}

export function setCompanyService(serviceID) {
  return (dispatch) => dispatch({
    type:SET_COMPANY_SERVICE,
    selectedServiceID:serviceID
  });
}

export function searchCompany(searchString) {
  return (dispatch) => {
    dispatch({type:COMPANY_SEARCH_REQUEST});
    getUserToken().then((token) => {
      const url = API_ROOT + `/companies?search=${searchString}&api_token=${token}`;
      return fetch(url)
        .then(response => response.json())
        .then(json =>  {
          const normalized = normalize(json.data,Schemas.COMPANY_ARRAY);
          dispatch(searchSuccess(normalized));
          dispatch(setSearchResult(normalized));
        })
        .catch((err)=> {
          dispatch({type:COMPANY_SEARCH_FAILURE})
        })
    });
  }

}