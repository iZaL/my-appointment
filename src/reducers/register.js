import {Record} from 'immutable';
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from './../constants/ActionTypes';

const InitialState = Record({
  isLoggedIn: false,
  isFetching: false,
  error: null,
});

const initialState = new InitialState;

export default function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case REGISTER_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case REGISTER_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    default:
      return state;
  }
}


