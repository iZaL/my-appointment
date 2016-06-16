import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER
} from './../constants/ActionTypes';

import {Record} from 'immutable';

const InitialState = Record({
  isFetching: false,
  error: null,
});

const initialState = new InitialState;

export default function loginReducer(state = initialState, action = {}) {

  switch (action.type) {
    case LOGIN_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case LOGIN_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case LOGIN_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    case LOGOUT_USER:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    default:
      return state;
  }

}


