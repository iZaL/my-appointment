import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ON_LOGIN_FORM_FIELD_CHANGE,
  LOGOUT_USER
} from '../../constants/ActionTypes';

import {Record} from 'immutable';
import validate from './../../validators/Auth/loginValidator';
import rules from './../../validators/validationRules';

const InitialState = Record({
  isFetching: false,
  error: null,
  form: new (Record({
    disabled: false,
    isValid: false,
    error: null,
    fields: new (Record({
      email: '',
      emailHasError: false,
      password: '',
      passwordHasError: false,
    }))
  }))
});

const initialState = new InitialState;

export default function login(state = initialState, action = {}) {

  switch (action.type) {
    case LOGIN_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case LOGIN_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case LOGIN_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    case ON_LOGIN_FORM_FIELD_CHANGE:
      const {field, value} = action.payload;
      let nextState = state.setIn(['form', 'fields', field], value).setIn(['form', 'error'], null);
      return validate(rules(nextState, action));
    case LOGOUT_USER:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    default:
      return state;
  }

}


