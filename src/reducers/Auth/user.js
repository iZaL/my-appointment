import { Record } from 'immutable';

import {
  SET_USER,
  APPOINTMENTS_REQUEST,
  APPOINTMENTS_SUCCESS,
  APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  INVALIDATE_APPOINTMENT,
  FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
  DELETE_APPOINTMENT,
  UNFAVORITE_COMPANY,
  FAVORITE_COMPANY,
  LOGIN_SUCCESS,
  LOGOUT_USER,
} from '../../constants/ActionTypes';

const InitialState= Record({
  isAuthenticated :false,
  authUserID:null, // authenticated user ID
  isFetching:false,
  favorites:new (Record({
    isFetching:false,
    error:null
  })),
  appointments:new (Record({
    isFetching:false,
    error:null,
    isCreating:false,
    created:false
  }))
});

const initialState = new InitialState;

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state
        .set('authUserID',action.userID)
        .set('isAuthenticated',true);
    case APPOINTMENTS_REQUEST:
      return state
        .setIn(['appointments', 'isFetching'], true)
        .setIn(['appointments', 'error'], null);
    case APPOINTMENTS_SUCCESS:
      return state
        .setIn(['appointments', 'isFetching'], false)
        .setIn(['appointments', 'error'], null)
    case APPOINTMENTS_FAILURE:
      return state
        .setIn(['appointments', 'isFetching'], false)
        .setIn(['appointments', 'error'], action.error);
    case CREATE_APPOINTMENT_REQUEST:
      return state
        .setIn(['appointments', 'isCreating'], true)
        .setIn(['appointments', 'created'], false)
        .setIn(['appointments', 'error'], null);
    case CREATE_APPOINTMENT_SUCCESS:
      return state
        .setIn(['appointments', 'isCreating'], false)
        .setIn(['appointments', 'created'], true)
        .setIn(['appointments', 'error'], null);
    case CREATE_APPOINTMENT_FAILURE:
      return state
        .setIn(['appointments', 'isCreating'], false)
        .setIn(['appointments', 'created'], false)
        .setIn(['appointments', 'error'], action.error);
    case INVALIDATE_APPOINTMENT:
      return state
        .setIn(['appointments', 'isCreating'], false)
        .setIn(['appointments', 'created'], false)
        .setIn(['appointments', 'error'], null);
    case FAVORITES_REQUEST:
      return state
        .setIn(['favorites', 'isFetching'], true)
        .setIn(['favorites', 'error'], null);
    case FAVORITES_SUCCESS:
      return state
        .setIn(['favorites', 'isFetching'], false)
        .setIn(['favorites', 'error'], null)
    case FAVORITES_FAILURE:
      return state
        .setIn(['favorites', 'isFetching'], false)
        .setIn(['favorites', 'error'], action.error);
    case LOGOUT_USER:
      return state
        .set('authUserID',null)
        .set('isAuthenticated',false)
    default:
      return state;


  }
}