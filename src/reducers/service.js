import { Record } from 'immutable';

import {
  SERVICE_REQUEST,
  SERVICE_SUCCESS,
  SERVICE_FAILURE
} from './../constants/ActionTypes'

const InitialState = Record({
  isFetching: false,
  error: null
});

const initialState = new InitialState;

export default function serviceReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SERVICE_REQUEST:
      return state
        .set('isFetching',true)
        .set('error',null);
    case SERVICE_SUCCESS:
      return state
        .set('isFetching',false)
        .set('error',null);
    case SERVICE_FAILURE:
      return state
        .set('isFetching',false)
        .set('error',action.error);
    default:
      return state
  }
}
