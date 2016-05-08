export default function validate(state) {

  const {fields} = state.form;

  if (
    fields.name != ''
    && fields.name != ''

    && fields.email != ''
    && !fields.emailHasError

    && fields.password != ''
    && !fields.passwordHasError

    && fields.passwordConfirmation != ''
    && !fields.passwordConfirmationHasError
  ) {
    return state.setIn(['form', 'isValid'], true);
  } else {
    return state.setIn(['form', 'isValid'], false);
  }

}
