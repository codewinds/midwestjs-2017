import fp from 'lodash/fp';

/*
   TODO 12a. Move initialState and reducer into its own file
   ./profileReducer.js and export reducer as reducer. Import reducer here
   TODO 12b. add a unique constant `key='profile'` to that file and export it
   TODO 12c. Prefix reducer actions with key and forward slash, so 'FIELDS_UPDATE becomes profile/FIELDS_UPDATE this namespaces our actions to avoid future collisions. Update actions to use this prefix.
   TODO 12e. In profileReducer.js, create and export a `selectors` object which has a property `fields` which returns a selector function. A selector function takes state and returns the desired data (object with firstName and lastName). Note that since we are using combineReducers, the root shape of our state has changed, so you will have to use the `key` to drill down.
   TODO 13. Change initial state shape creating a new property `fields` and moving firstName and lastName into it (so it is one level deeper in the object). Adjust the reducer and selector to the new path.
 */

export const key = 'profile';

const initialState = {
  fields: {
    firstName: '',
    lastName: ''
  }
};

export function reducer(state = initialState, action = {}) {
  // TODO handle FIELDS_UPDATE action
  // TODO return original state for all other actions
  switch (action.type) {
    case `${key}/FIELDS_UPDATE`: // profile/FIELDS_UPDATE
      return fp.merge(state, {
        fields: action.payload
      });
    default:
      return state;
  }
}

export const selectors = {
  fields(state) { return state[key].fields; }
};
