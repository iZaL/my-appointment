import { API_ROOT, API_TOKEN } from './../../constants/config'
import { setUserToken, getUserToken, forgetItem } from './../../utils/storage';
import { Schemas } from './../../utils/schema';
import { normalize } from 'normalizr';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
} from '../../constants/ActionTypes';

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

function loginSuccess(payload) {
  const normalized = normalize(payload.data,Schemas.USER);
  return {
    type: LOGIN_SUCCESS,
    userID:payload.data.id,
    entities:normalized.entities
  };
}

function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    error: message
  };
}

export function login(credentials) {
  const url = API_ROOT + '/auth/login';
  return dispatch => {
    dispatch(loginRequest());
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(loginSuccess(json));
          setUserToken(json.data.api_token);
          return true;
        } else {
          dispatch(loginFailure(json.message));
          return false;
        }
      })
      .catch((err)=> dispatch(loginFailure(err)));
  }
}

export function loginUserByToken() {
  return (dispatch) => {
    dispatch(loginRequest());
    return getUserToken()
      .then((token) => {
        const url = API_ROOT + `/auth/login/token`;
        return fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            api_token:token
          })
        })
          .then(response => response.json())
          .then(json => {
            if (json.success) {
              dispatch(loginSuccess(json));
              return true;
            } else {
              dispatch(loginFailure(json.message));
              return false;
            }
          })
      })
      .catch((err)=> {
        dispatch(loginFailure(err));
        return false;
      });
  }
}

export function logoutUser() {
  forgetItem(API_TOKEN);
  return (dispatch,getState) => {
    const currentUser = Object.assign({},getState().entities.users[getState().userReducer.authUserID],{favorites:[]});
    const normalized = normalize(currentUser,Schemas.USER);
    dispatch({type:LOGOUT_USER,entities:normalized.entities});
    const normalizedAppointments = normalize({},Schemas.APPOINTMENT_ARRAY);
    dispatch({type:LOGOUT_USER,entities:normalizedAppointments.entities});

  }
}