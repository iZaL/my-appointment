/*
 a bootstrap like style
 */
'use strict';

var LABEL_COLOR = '#888888';
var INPUT_COLOR = '#999999';
var ERROR_COLOR = '#a94442';
var HELP_COLOR = '#999999';
var BORDER_COLOR = '#E7E7E7';
var DISABLED_COLOR = '#777777';
var DISABLED_BACKGROUND_COLOR = '#E7E7E7';
var FONT_SIZE = 14;
var FONT_WEIGHT = '300';

var stylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10
    },
    error: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      fontFamily:'Avenir-Light',
      marginBottom: 2,
      fontWeight: FONT_WEIGHT,
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      fontFamily:'Avenir-Light',
      marginBottom: 2,
      fontWeight: FONT_WEIGHT,
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: 12,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2,
      fontFamily:'Avenir-Light',
    }
  },
  errorBlock: {
    fontSize: 14,
    marginBottom: 2,
    color: ERROR_COLOR,

  },
  textbox: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      borderRadius: 0,
      borderColor: BORDER_COLOR,
      fontFamily:'Avenir-Light',
      borderWidth: 1,
      marginBottom: 5,
      height: 35,
      padding: 5,
      borderBottomColor: '#48BBEC',
    },

    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 35,
      padding: 5,
      borderRadius: 0,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      marginBottom: 5,
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 35,
      padding: 5,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR,
    }
  },
  checkbox: {
    normal: {
      color: INPUT_COLOR,
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      marginBottom: 4,
    }
  },
  select: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  }
});

module.exports = stylesheet;