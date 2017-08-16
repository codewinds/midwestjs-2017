import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import { Simulate } from 'react-addons-test-utils';

/*
   TODO 12a. Move initialState and reducer into its own file
   ./profileReducer.js and export reducer as reducer. Import reducer here
   TODO 12b. add a unique constant `key='profile'` to that file and export it
   TODO 12c. Prefix reducer actions with key and forward slash, so 'FIELDS_UPDATE becomes profile/FIELDS_UPDATE this namespaces our actions to avoid future collisions. Update actions to use this prefix.
   TODO 12d. In index.js use redux combineReducers to create a reducer which includes our new profileReducer. Use the exported key as the combineReducer key. With this structure we can add new reducers easily at anytime in the future.
   TODO 12e. In profileReducer.js, create and export a `selectors` object which has a property `fields` which returns a selector function. A selector function takes state and returns the desired data (object with firstName and lastName). Note that since we are using combineReducers, the root shape of our state has changed, so you will have to use the `key` to drill down.
   TODO 12f. In index.js use this selector to get access to firstName and lastName rather than specifying properties. By using selectors anytime we want to get to fields, we can easily go to reducers and change the shape (just update reducer and selector).
   TODO 13. Change initial state shape creating a new property `fields` and moving firstName and lastName into it (so it is one level deeper in the object). Adjust the reducer and selector to the new path.
 */
describe('redux/growth', () => {
  const appContainerDiv = document.querySelector('#appContainer');


  const actions = {
    fieldsUpdate(ev) {
      return { type: 'FIELDS_UPDATE',
               payload: { [ev.target.name]: ev.target.value }};
    }
  };

  const initialState = {
    firstName: '',
    lastName: ''
  };

  function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case 'FIELDS_UPDATE':
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  }

  const store = createStore(reducer);
  let history = [];

  const CProfile = connect(
    state => ({
      firstName: state.firstName,
      lastName: state.lastName
    }),
    {
      fieldsUpdate: actions.fieldsUpdate
    }
  )(Profile);

  function App() {
    return (
      <div>
        <h2>Redux Solution - growth</h2>
        <CProfile />
      </div>
    );
  }
  function renderToDOM() {
    return new Promise(resolve => { // resolve when done rendering
      ReactDOM.render(
        <Provider store={store} >
          <App />
        </Provider>,
        appContainerDiv,
        () => resolve() // resolve when done rendering
      );
    });
  }
  store.subscribe(() => {
    history.push(store.getState());
  });

  function Profile({ firstName, lastName, fieldsUpdate }) {
    return (
      <div>
      <h3>Profile Update</h3>
        <input name='firstName' value={firstName}
               placeholder='First Name'
               className='firstName'
               onChange={fieldsUpdate} />
        <input name='lastName' value={lastName}
               placeholder='Last Name'
               className='lastName'
      onChange={fieldsUpdate} />
      <h3>Preview</h3>
      <div className="preview">{ firstName } { lastName }</div>
      </div>
    );
  }
  Profile.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    fieldsUpdate: PropTypes.func.isRequired
  };

  /*
     Completely clear out the previous render since react-redux
     Provider doesn't allow us to change store on the fly like
     we are doing in these tests, (rebuilding store many times).
     You don't normally need to do this in the real world.
   */
  beforeEach('completely clear previous render', done => {
    ReactDOM.render(
      <div></div>,
      appContainerDiv,
      () => done()
    );
  });

  it('reducer should create state from initialState', () => {
    const result = reducer();
    expect(result).toExist();
    expect(result.profile).toExist();
    expect(result.profile.fields).toExist();
    expect(result.profile.fields.firstName).toBe('');
    expect(result.profile.fields.lastName).toBe('');
  });

  it('reducer should update for FIELDS_UPDATE action', () => {
    const state1 = {
      profile: {
        fields: {
          firstName: 'Joe',
          lastName: 'Smith'
        }
      }
    };
    deepFreeze(state1); // just for testing purposes to ensure no mutation

    const updatedFields = {
      firstName: 'Mary',
      lastName: 'Brown'
    };
    const state2 = reducer(state1, { type: 'profile/FIELDS_UPDATE', payload: updatedFields });
    expect(state2).toNotBe(state1);
    expect(state2).toEqual({
      profile: {
        fields: {
          firstName: 'Mary',
          lastName: 'Brown'
        }
      }
    });
  });

  it('reducer should return state for other actions', () => {
    const state1 = {
      profile: {
        fields: {
          firstName: 'Joe',
          lastName: 'Smith'
        }
      }
    };
    const state2 = reducer(state1, { type: 'OTHER' });
    expect(state2).toBe(state1);
  });

  it('store should exist', () => {
    expect(store).toExist();
  });

  it('store should have default state', () => {
    const state = store.getState();
    expect(state).toEqual({
      profile: {
        fields: {
          firstName: '',
          lastName: ''
        }
      }
    });
  });

  it('history should add one item matching initialState for each dispatch', () => {
    history = []; // resetting history array
    store.dispatch({ type: 'OTHER' });
    expect(history.length).toBe(1);
    expect(history).toEqual([
      {
        profile: {
          fields: {
            firstName: '',
            lastName: ''
          }
        }
      }
    ]);
  });

  it('store state should have firstName = newFirstName after dispatch', () => {
    store.dispatch(actions.fieldsUpdate({ target: {
      name: 'firstName',
      value: 'newFirstName'
    }}));
    expect(profileSel.fields(store.getState()).firstName).toBe('newFirstName');
  });

  /*
     TODO 7. Dispatch an action to update the last name
     { type: 'FIELDS_UPDATE', payload: { lastName: 'newLastName' }}
   */
  it('store state should have lastName = newLastName after dispatch', () => {
    store.dispatch(actions.fieldsUpdate({ target: {
      name: 'lastName',
      value: 'newLastName'
    }}));
    expect(profileSel.fields(store.getState()).lastName).toBe('newLastName');
  });

  it('store state should update both names after dispatch', () => {
    store.dispatch({ type: 'profile/FIELDS_UPDATE',
                     payload: {
                       firstName: 'Wendy',
                       lastName: 'Brown'
                     }});
    expect(profileSel.fields(store.getState())).toEqual({
      firstName: 'Wendy',
      lastName: 'Brown'
    });
  });


  it('CProfile should exist', () => {
    expect(CProfile).toExist();
  });

  it('App should render CProfile', () => {
    return renderToDOM()
      .then(() => {
        const firstNameElem = appContainerDiv.querySelector('.firstName');
        const lastNameElem = appContainerDiv.querySelector('.lastName');
        expect(firstNameElem).toExist();
        expect(lastNameElem).toExist();
      });
  });

  it('App should respond to changing data, showing preview', () => {
    return renderToDOM()
      .then(() => {
        const firstNameElem = appContainerDiv.querySelector('.firstName');
        const lastNameElem = appContainerDiv.querySelector('.lastName');
        firstNameElem.value = 'John';
        Simulate.change(firstNameElem);
        lastNameElem.value = 'Smith';
        Simulate.change(lastNameElem);
        const previewElem = appContainerDiv.querySelector('.preview');
        expect(previewElem.textContent).toEqual('John Smith');
      });
  });

});
