import { API_ROOT } from './../../constants/config';
import { Schemas } from './../../utils/schema';
import { normalize } from 'normalizr';
import {
  SERVICES_REQUEST,
  SERVICES_SUCCESS,
  SERVICES_FAILURE
} from '../../constants/ActionTypes'

function servicesRequest() {
  return {
    type: SERVICES_REQUEST
  }
}

function servicesSuccess(payload) {
  const normalized = normalize(payload.data,Schemas.SERVICE_ARRAY);
  return {
    type: SERVICES_SUCCESS,
    entities: normalized.entities
  }
}

function servicesFailure(error) {
  return {
    type: SERVICES_FAILURE,
    error: error
  }
}

export function fetchServices() {
  const url = API_ROOT + '/services';
  return (dispatch) => {
    dispatch(servicesRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(servicesSuccess(json))
      })
      .catch((err)=> {
        dispatch(servicesFailure(err))
      })
  }
}
