'use strict';

import validate from 'validate.js';
import _ from 'lodash';

/**
 * ## Email validation setup
 * Used for validation of emails
 */
const emailConstraints = {
  from: {
    email: true
  }
};

/**
 * ## name validation rule
 * read the message.. ;)
 */
const namePattern = /^[ a-zA-Z]{3,30}$/;
const nameConstraints = {
  name: {
    format: {
      pattern: namePattern,
      flags: 'i',
      message: "must have 3-30 alphabets"
    }
  }
};

/**
 * ## password validation rule
 * read the message... ;)
 */
const passwordPattern = /^[a-zA-Z0-9]{6,12}$/;
const passwordConstraints = {
  password: {
    format: {
      pattern: passwordPattern,
      flags: "i",
      message: "have at least a number and a special character,"
      + " and between 6-12 in length"
    }
  }
};

const passwordConfirmationConstraints = {
  confirmPassword: {
    equality: "password"
  }
};


/**
 * ## password validation rule
 * read the message... ;)
 */
const mobilePattern = /^[0-9]{8}$/;
const mobileConstraints = {
  mobile: {
    format: {
      pattern: mobilePattern,
      flags: "i",
      message: "8 digit phone number"
    }
  }
};

/**
 * ## Field Validation
 * @param {Object} state Redux state
 * @param {Object} action type & payload
 */
export default function rules(state, action) {
  const {field, value} = action.payload;

  switch (field) {
  /**
   * ### name validation
   * set the form field error
   */
    case('name'):
      let validName = _.isUndefined(validate({name: value},
        nameConstraints));
      if (validName) {
        return state.setIn(['form', 'fields', 'nameHasError'], false);
      } else {
        return state.setIn(['form', 'fields', 'nameHasError'], true);
      }
      break;

  /**
   * ### email validation
   * set the form field error
   */
    case('email'):
      let validEmail = _.isUndefined(validate({from: value},
        emailConstraints));
      if (validEmail) {
        return state.setIn(['form', 'fields', 'emailHasError'], false);
      } else {
        return state.setIn(['form', 'fields', 'emailHasError'], true);
      }
      break;

  /**
   * ### password validation
   * set the form field error
   */
    case('password'):
      let validPassword = _.isUndefined(validate({password: value},
        passwordConstraints));
      if (validPassword) {
        return state.setIn(['form', 'fields', 'passwordHasError'], false);
      } else {
        return state.setIn(['form', 'fields', 'passwordHasError'], true);
      }
      break;

  /**
   * ### passwordAgain validation
   * set the form field error
   */
    case('passwordConfirmation'):
      var validPasswordAgain
        = _.isUndefined(validate({
        password: state.form.fields.password,
        confirmPassword: value
      }, passwordConfirmationConstraints));
      if (validPasswordAgain) {
        return state.setIn(['form', 'fields', 'passwordConfirmationHasError'], false);
      } else {
        return state.setIn(['form', 'fields', 'passwordConfirmationHasError'], true);
      }
      break;

    case('mobile'):
      let validMobile = _.isUndefined(validate({mobile: value}, mobileConstraints));
      if (validMobile) {
        return state.setIn(['form', 'fields', 'mobileHasError'], false);
      } else {
        return state.setIn(['form', 'fields', 'mobileHasError'], true);
      }
      break;

  }
  return state;

}
