import fp from 'lodash/fp';

/*
   TODO 16. Add `errors` to your profileReducer initialState. It
   will be an array of string error messages, initially empty array.
   Add a `errors` selector to profileSel.

   TODO 17. In your profileReducer, handle the action type
   `profile/FIELDS_INVALID` it will look like this
   { type: 'profile/FIELDS_INVALID', payload: {
   errors: ['first name is required'],
   updates: { firstName: '' }}}
   You will update the fields using the properties from `updates`
   and update errors using the array from `errors`
   Also in your `profile/FIELDS_UPDATE` handler set errors
   to empty array for the valid case.
 */

export const key = 'profile';

const initialState = {
  errors: [],
  fields: {
    firstName: '',
    lastName: ''
  }
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${key}/FIELDS_UPDATE`: // profile/FIELDS_UPDATE
      return fp.pipe([
        fp.set('errors', []),
        fp.update('fields',
                  x => fp.merge(x, action.payload))
      ])(state);
    case `${key}/FIELDS_INVALID`: // profile/FIELDS_INVALID
      return fp.pipe([
        fp.set('errors', action.payload.errors),
        fp.update('fields',
                  x => fp.merge(x, action.payload.updates))
      ])(state);
    default:
      return state;
  }
}

export const selectors = {
  fields(state) { return state[key].fields; },
  errors(state) { return state[key].errors; }
};

