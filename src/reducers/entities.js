import merge from 'lodash/merge';

const initialState = {
  users: {},
  categories:{},
  companies: {},
  services:{},
  appointments:{},
  employees:{},
  timings:{}
};

export default function entities(state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }
  return state;
}