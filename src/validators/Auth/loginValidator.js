export default function validate(state) {

  const {fields} = state.form;

  if (fields.email != '' && fields.password !='' && !fields.emailHasError && !fields.passwordHasError) {
    return state.setIn(['form', 'isValid'], true);
  } else {
    return state.setIn(['form', 'isValid'], false);
  }

}
