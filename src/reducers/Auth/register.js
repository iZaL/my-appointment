import {Record} from 'immutable';
import validate from './../../validators/Auth/registerValidator';
import rules from './../../validators/validationRules';
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  ON_REGISTER_FORM_FIELD_CHANGE
} from '../../constants/ActionTypes';

const InitialState = Record({
  isLoggedIn: false,
  isFetching: false,
  error: null,
  form: new (Record({
    disabled: false,
    isValid: false,
    error: null,
    fields: new (Record({
      name: '',
      nameHasError: false,
      email: '',
      emailHasError: false,
      password: '',
      passwordHasError: false,
      passwordConfirmation: '',
      passwordConfirmationHasError: false,
      mobile: '',
      mobileHasError: false
    }))
  }))
});

const initialState = new InitialState;

export default function register(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['form', 'error'], null).setIn(['error'], null);
    case REGISTER_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['form', 'error'], null).setIn(['error'], null);
    case REGISTER_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['form', 'error'], action.error).setIn(['error'], action.error);
    case ON_REGISTER_FORM_FIELD_CHANGE:
    {
      const {field, value} = action.payload;

      let nextState = state.setIn(['form', 'fields', field], value).setIn(['form', 'error'], null);

      return validate(rules(nextState, action));
    }
    default:
      return state;
  }
}


