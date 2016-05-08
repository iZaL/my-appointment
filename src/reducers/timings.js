import { Record } from 'immutable';

import {
  TIMINGS_REQUEST,
  TIMINGS_SUCCESS,
  TIMINGS_FAILURE
} from '../constants/ActionTypes'

const InitialState = Record({
  isFetching: false,
  error: null
});

const initialState = new InitialState;

export default function timingsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TIMINGS_REQUEST:
      return state
        .set('isFetching',true)
        .set('error',null);
    case TIMINGS_SUCCESS:
      return state
        .set('isFetching',false)
        .set('error',null);
    case TIMINGS_FAILURE:
      return state
        .set('isFetching',false)
        .set('error',action.error);
    default:
      return state
  }
}
