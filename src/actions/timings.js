import {API_ROOT} from './../constants/config';
import { Schemas } from './../utils/schema';
import { normalize } from 'normalizr';
import isEmpty from 'lodash/isEmpty';

import {
  TIMINGS_REQUEST,
  TIMINGS_SUCCESS,
  TIMINGS_FAILURE,
} from '../constants/ActionTypes';

function timingsRequest() {
  return {
    type: TIMINGS_REQUEST
  }
}

function timingsSuccess(payload) {
  const normalized = normalize(payload.data,Schemas.TIMING_ARRAY);
  return {
    type: TIMINGS_SUCCESS,
    entities:normalized.entities
  }
}

function timingsFailure(error) {
  return {
    type: TIMINGS_FAILURE,
    error: error
  }
}

export function fetchTimings() {
  var url = API_ROOT +'/timings';
  return (dispatch,getState) => {
    if(!isEmpty(getState().entities.timings)) {
      return;
    }
    dispatch(timingsRequest());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(timingsSuccess(json))
      })
      .catch((err)=> {
        dispatch(timingsFailure(err));
      })
  }
}