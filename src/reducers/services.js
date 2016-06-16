import { Record } from 'immutable';

import {
  SERVICES_REQUEST,
  SERVICES_SUCCESS,
  SERVICES_FAILURE,
} from './../constants/ActionTypes'

const InitialState = Record({
  isFetching: false,
  error: null
});

const initialState = new InitialState;

export default function servicesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SERVICES_REQUEST:
      return state
        .set('isFetching',true)
        .set('error',null);
    case SERVICES_SUCCESS:
      return state
        .set('isFetching',false)
        .set('error',null);
    case SERVICES_FAILURE:
      return state
        .set('isFetching',false)
        .set('error',action.error);
    default:
      return state
  }
}
