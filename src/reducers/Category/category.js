import {Record,List} from 'immutable';

import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE,
} from '../../constants/ActionTypes';

const InitialState = Record({
  isFetching: false,
  error: null
});

const initialState = new InitialState;

export default function categoryReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return state
        .set('isFetching',true)
        .set('error',null);
    case CATEGORY_SUCCESS:
      return state
        .set('isFetching',false)
        .set('error',null);
    case CATEGORY_FAILURE:
      return state
        .set('isFetching',false)
        .set('error',action.error);
    default:
      return state
  }
}
