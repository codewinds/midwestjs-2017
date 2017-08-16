import fp from 'lodash/fp';
import { selectors as profileSel } from './profileReducer';
import { createLogic } from 'redux-logic';

export const profileFieldsUpdateLogic = createLogic({
  type: 'profile/FIELDS_UPDATE',
  validate({ getState, action }, allow, reject) {
    const updates = action.payload;
    const fields = profileSel.fields(getState());
    const merged = fp.merge(fields, updates);
    const errors = [];
    if (!merged.firstName) { errors.push('firstName is required'); }
    if (!merged.lastName) { errors.push('lastName is required'); }
    if (!errors.length) {  // no errors, let action through as is
      return allow(action);
    }
    // otherwise we have errors, change action to FIELDS_INVALID
    reject({
      type: 'profile/FIELDS_INVALID',
      payload: {
        errors,
        updates
      }
    });
  }
});

export default [
  profileFieldsUpdateLogic
]
