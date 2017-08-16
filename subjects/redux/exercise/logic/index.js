import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import { Simulate } from 'react-addons-test-utils';
import { key as profileKey,
         selectors as profileSel,
         reducer as profileReducer } from './profileReducer';

/*
   TODO 15. Using redux `applyMiddleware` add redux-logic
   Hint: use redux-logic createLogicMiddleware with an empty logic
   array to start with. Add the logicMiddlware using applyMiddleware.
   Also set a ref on store to the logicMiddleware like
   `store.logicMiddleware = logicMiddleware` so that we can access it
   later.

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

   TODO 18. Update your Profile component to accept a prop for `errors`.
   Add to the propTypes. It should use the className of `error` to
   display the error message.

   TODO 19. Connect your errors from the store in the connect for
   CProfile using `profileSel.errors` selector.

   TODO 20. In ./logic.js, create a profileFieldsUpdateLogic
   using redux-logic createLogic which listens for your
   `profile/FIELDS_UPDATE` action. It should have a validate
   hook which uses getState and action to determine the new
   set of validation errors which are that both firstName and
   lastName must exist. If valid, call `allow()` with the original
   action `allow(action)` otherwise call `reject(newAction)` with
   a new action of type `profile/FIELDS_INVALID` and a payload
   object containing `errors` array and `updates` object of field
   updates. Add profileFieldsUpdateLogic to your arrLogic passed into
   createLogicMiddleware.

   Now this logic will be called anytime FIELDS_UPDATE is
   dispatched and if valid it will allow it through as is,
   otherwise it will instead dispatch a FIELDS_INVALID action
   which also contains the errors. All errors should be displayed
   in red above the input fields. Clear out values to verify.

 */
describe('redux/logic', () => {
  const appContainerDiv = document.querySelector('#appContainer');

  const actions = {
    fieldsUpdate(ev) {
      return { type: `${profileKey}/FIELDS_UPDATE`, // profile/FIELDS_UPDATE
               payload: { [ev.target.name]: ev.target.value }};
    }
  };

  const reducer = combineReducers({
    [profileKey]: profileReducer
  });

  const store = createStore(reducer);
  let history = [];

  const CProfile = connect(
    state => ({
      firstName: profileSel.fields(state).firstName,
      lastName: profileSel.fields(state).lastName
    }),
    {
      fieldsUpdate: actions.fieldsUpdate
    }
  )(Profile);

  function App() {
    return (
      <div>
      <h2>Redux Solution - logic</h2>
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

  it('App should show validation errors', () => {
    return renderToDOM()
      .then(() => {
        const firstNameElem = appContainerDiv.querySelector('.firstName');
        const lastNameElem = appContainerDiv.querySelector('.lastName');
        firstNameElem.value = '';
        Simulate.change(firstNameElem);
        lastNameElem.value = '';
        Simulate.change(lastNameElem);
        const errorNodeList = appContainerDiv.querySelectorAll('.error');
        const errors = [];
        errorNodeList.forEach(x => { errors.push(x.textContent); });
        expect(errors.length).toBe(2);
        expect(errors.filter(x => /firstName/.test(x)).length).toExist();
        expect(errors.filter(x => /lastName/.test(x)).length).toExist();
      });
  });

  it('App should clear validation errors when valid data entered', () => {
    return renderToDOM()
      .then(() => {
        const firstNameElem = appContainerDiv.querySelector('.firstName');
        const lastNameElem = appContainerDiv.querySelector('.lastName');
        firstNameElem.value = '';
        Simulate.change(firstNameElem);
        lastNameElem.value = '';
        Simulate.change(lastNameElem);
        const errorNodeList1 = appContainerDiv.querySelectorAll('.error');
        expect(errorNodeList1.length).toBe(2);
        firstNameElem.value = 'Jessica';
        Simulate.change(firstNameElem);
        lastNameElem.value = 'Truth';
        Simulate.change(lastNameElem);
        const errorNodeList2 = appContainerDiv.querySelectorAll('.error');
        expect(errorNodeList2.length).toBe(0);
      });
  });

  it('profile/FIELDS_UPDATE should be called for valid updates', () => {
    const nextOps = [];
    store.logicMiddleware.monitor$.subscribe(x => {
      if (x.op === 'next') { nextOps.push(x); }
    });
    return renderToDOM()
      .then(() => {
        const firstNameElem = appContainerDiv.querySelector('.firstName');
        const lastNameElem = appContainerDiv.querySelector('.lastName');
        firstNameElem.value = 'Jessica';
        lastNameElem.value = 'Truth';
        Simulate.change(firstNameElem);
        Simulate.change(lastNameElem);
        return store.logicMiddleware.whenComplete(() => {
          expect(nextOps.length).toBe(2);
          expect(nextOps[0].nextAction.type).toBe('profile/FIELDS_UPDATE');
          expect(nextOps[1].nextAction.type).toBe('profile/FIELDS_UPDATE');
        });
      });
  });

  it('profile/FIELDS_INVALID should be called for invalid updates', () => {
    const dispOps = [];
    store.logicMiddleware.monitor$.subscribe(x => {
      if (x.op === 'dispatch') { dispOps.push(x); }
    });
    return renderToDOM()
      .then(() => {
        const firstNameElem = appContainerDiv.querySelector('.firstName');
        const lastNameElem = appContainerDiv.querySelector('.lastName');
        firstNameElem.value = '';
        Simulate.change(firstNameElem);
        lastNameElem.value = '';
        Simulate.change(lastNameElem);
        return store.logicMiddleware.whenComplete(() => {
          expect(dispOps.length).toBe(2);
          expect(dispOps[0].dispAction.type).toBe('profile/FIELDS_INVALID');
          expect(dispOps[1].dispAction.type).toBe('profile/FIELDS_INVALID');
        });
      });
  });

});
