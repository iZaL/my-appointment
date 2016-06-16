import { Record } from 'immutable';

import {
  COMPANY_REQUEST,
  COMPANY_SUCCESS,
  COMPANY_FAILURE,
  COMPANY_SEARCH_REQUEST,
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_FAILURE,
  SET_COMPANY_SERVICE
} from './../constants/ActionTypes'

const InitialState = Record({
  isFetching: false,
  error: null,
  selectedServiceID:null,
  isSearching:false,
  searchResults:[]
});

const initialState = new InitialState;

export default function companyReducer(state = initialState, action = {}) {
  switch (action.type) {
    case COMPANY_REQUEST:
      return state
        .set('isFetching',true)
        .set('error',null);
    case COMPANY_SUCCESS:
      return state
        .set('isFetching',false)
        .set('error',null);
    case COMPANY_FAILURE:
      return state
        .set('isFetching',false)
        .set('error',action.error);
    case SET_COMPANY_SERVICE:
      return state.set('selectedServiceID',action.selectedServiceID);
    case COMPANY_SEARCH_REQUEST:
      return state
        .set('isSearching',true);
    case COMPANY_SEARCH_SUCCESS:
      return state
        .set('isSearching',false)
        .set('searchResults',action.result);
    case COMPANY_SEARCH_FAILURE:
      return state
        .set('isSearching',false);

    default:
      return state
  }
}
