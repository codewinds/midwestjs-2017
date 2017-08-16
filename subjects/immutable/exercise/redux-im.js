import expect from 'expect';
import { createStore } from 'redux';
import Imm from 'immutable';

/* Convert profileReducer in React/Redux app to ImmutableJS Record/List */

describe('immutable/redux-im', () => {

  let profileInitialState = null; // defined later
  let profileReducer = null; // defined later
  let store = null; // defined later

  beforeEach('create profileInitialState as ImmutableJS records and lists', () => {
    // TODO 7a - convert profileInialState to use Immutable.js Record/List
    profileInitialState = {
      firstName: 'Jordan',
      lastName: 'Bell',
      emails: [
        'jordan@foo.com',
        'jbellfoo@gmail.com'
      ]
    };
  });

  it('profileInitialState should have correct data', () => {
    expect(profileInitialState).toBeA(Imm.Record);
    expect(profileInitialState.toJS()).toEqual({
      firstName: 'Jordan',
      lastName: 'Bell',
      emails: [
        'jordan@foo.com',
        'jbellfoo@gmail.com'
      ]
    });
  });


  beforeEach('convert profileReducer to use Immutable.js', () => {
    // TODO 7b - convert profileReducer to use Immutable.js
    /*
       reducer needs to respond to these actions:
       action = { type: 'profile/FIELD_UPDATE',
                  payload: { firstName: 'foo', lastName: 'bar' }
         payload might have only one of these as well

       action = { type: 'profile/ADD_EMAIL',
       payload: 'j@foo.com'
    */
    profileReducer = function (state = profileInitialState, action = {}) {
      switch (action.type) {
        case 'profile/FIELD_UPDATE': // for firstName and lastName updates
          // action.payload = { firstName: 'foo', lastName: 'bar' }
          return {
            ...state,
            ...action.payload
          };
        case 'profile/ADD_EMAIL':
          // action.payload = 'newemail@foo.com'
          return {
            ...state,
            emails: state.emails.concat(action.payload)
          };
        default:
          return state;
      }
    };
  });

  beforeEach('create store', () => {
    store = createStore(profileReducer);
  });

  it('should have proper initial state', () => {
    expect(store.getState().toJS()).toEqual({
      firstName: 'Jordan',
      lastName: 'Bell',
      emails: [
        'jordan@foo.com',
        'jbellfoo@gmail.com'
      ]
    });
  });

  it('should update profile fields', () => {
    store.dispatch({
      type: 'profile/FIELD_UPDATE',
      payload: {
        firstName: 'Jorden',
        lastName: 'Baz'
      }
    });
    expect(store.getState().toJS()).toEqual({
      firstName: 'Jorden',
      lastName: 'Baz',
      emails: [
        'jordan@foo.com',
        'jbellfoo@gmail.com'
      ]
    });
  });

  it('should add email', () => {
    store.dispatch({
      type: 'profile/ADD_EMAIL',
      payload: 'jb@baz.com'
    });
    expect(store.getState().toJS()).toEqual({
      firstName: 'Jordan',
      lastName: 'Bell',
      emails: [
        'jordan@foo.com',
        'jbellfoo@gmail.com',
        'jb@baz.com'
      ]
    });
  });
});
