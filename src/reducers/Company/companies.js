import { Record } from 'immutable';

import {
  COMPANIES_REQUEST,
  COMPANIES_SUCCESS,
  COMPANIES_FAILURE,
} from '../../constants/ActionTypes'

const InitialState = Record({
  isFetching: false,
  error: null
});

const initialState = new InitialState;

export default function companiesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case COMPANIES_REQUEST:
      return state
        .set('isFetching',true)
        .set('error',null);
    case COMPANIES_SUCCESS:
      return state
        .set('isFetching',false)
        .set('error',null);
    case COMPANIES_FAILURE:
      return state
        .set('isFetching',false)
        .set('error',action.error);
    default:
      return state
  }
}
