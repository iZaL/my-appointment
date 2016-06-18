import {API_ROOT} from './../../constants/config'

import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../../constants/ActionTypes';

function registerRequest() {
  return {
    type: REGISTER_REQUEST
  };
}

function registerSuccess() {
  return {
    type: REGISTER_SUCCESS
  };
}

function registerFailure(errors) {
  return {
    type: REGISTER_FAILURE,
    error: errors
  };
}

export function signup(inputs, cb = ()=> { success: false }) {
  return dispatch => {

    // change passwordConfirmation to password_confirmation
    inputs.password_confirmation = inputs.passwordConfirmation;

    dispatch(registerRequest());
    return fetch(API_ROOT + '/auth/register', {
      method: 'POST',
      body: JSON.stringify(inputs)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == false) {
          dispatch(registerFailure(json.message));
          let errorMessage = json.error ? json.error[0]: '' ;
          return cb({success: false,errorMessage:errorMessage});
        } else {
          dispatch(registerSuccess());
          return cb({success: true});
        }
      })
      .catch((err)=> {
        dispatch(registerFailure(err))
      });
  };
}
