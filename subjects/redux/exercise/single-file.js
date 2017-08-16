import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { Simulate } from 'react-addons-test-utils';

describe('redux/single-file', () => {
  const appContainerDiv = document.querySelector('#appContainer');

  const actions = {
    fieldsUpdate(ev) {
      return { type: 'FIELDS_UPDATE',
               payload: { [ev.target.name]: ev.target.value }};
    }
  };

  let initialState = null; // defined later
  let reducer = null; // defined later
  let store = null; // defined later
  let history = [];
  let CProfile = null; // defined later
  let App = null; // defined later
  let renderToDOM = () => {}; // redefined later

  /*
     TODO 1. Create the initialState for a profile component, it
     will need `firstName` and `lastName` as empty strings.
   */
  beforeEach('define initialState', () => {
    // TODO define the initialState object
    initialState = null; // TODO replace this
  });

  it('initialState should have proper fields', () => {
    expect(initialState).toBeAn(Object);
    expect(Object.keys(initialState).sort()).toEqual([
      'firstName',
      'lastName'
    ]);
  });


  /*
    TODO 2. Create a reducer which uses the initialState and responds to
    an action of 'FIELDS_UPDATE' with an action payload of
    { firstName: 'updatedFirstName' } OR
    { lastName: 'updatedLastName' } OR
    { firstName: 'foo', lastName: 'bar' }
    Also don't forget to handle default case, returning state as is
   */
  beforeEach('create reducer', () => {
    reducer = function (state = initialState, action = {}) {
      // TODO handle FIELDS_UPDATE action
      // TODO return original state for all other actions
    };
  });

  it('reducer should create state from initialState', () => {
    const result = reducer();
    expect(result).toExist();
    expect(result).toEqual(initialState);
  });

  it('reducer should update for FIELDS_UPDATE action', () => {
    const state1 = {
      firstName: 'Joe',
      lastName: 'Smith'
    };
    deepFreeze(state1); // just for testing purposes to ensure no mutation

    const updatedFields = {
      firstName: 'Mary',
      lastName: 'Brown'
    };
    const state2 = reducer(state1, { type: 'FIELDS_UPDATE', payload: updatedFields });
    expect(state2).toNotBe(state1);
    expect(state2).toEqual(updatedFields);
  });

  it('reducer should return state for other actions', () => {
    const state1 = {
      firstName: 'Joe',
      lastName: 'Smith'
    };
    const state2 = reducer(state1, { type: 'OTHER' });
    expect(state2).toBe(state1);
  });


  /*
    TODO 3. Create a Redux store which uses this reducer
   */
  beforeEach('create redux store', () => {
    // TODO create redux store using redux createStore()
    store = null; // TODO replace
  });

  it('store should exist', () => {
    expect(store).toExist();
  });

  it('store should have default state of initialState', () => {
    // TODO 4. access the current state from the store
    const state = null; // TODO replace
    expect(initialState).toExist();
    expect(state).toEqual(initialState);
  });


  /*
  TODO 5. Create a listener function that subscribes to the store's
  changes and appends the state to a history array
   */
  beforeEach('create listener and dispatch OTHER', () => {
    // TODO create a listener to store that appends state to history arr
  });

  it('history should add one item matching initialState for each dispatch', () => {
    history = []; // resetting history array

    // TODO dispatch { type: 'OTHER' } to the store

    expect(history.length).toBe(1);
    expect(history).toEqual([initialState]);
  });


  /*
     TODO 6. Dispatch an action to update the first name
     { type: 'FIELDS_UPDATE', payload: { firstName: 'newFirstName' }}
   */
  it('store state should have firstName = newFirstName after dispatch', () => {
    // TODO dispatch FIELDS_UPDATE action seting firstName: 'newFirstName'
    expect(store.getState().firstName).toBe('newFirstName');
  });

  /*
  TODO 7. Dispatch an action to update the last name
  { type: 'FIELDS_UPDATE', payload: { lastName: 'newLastName' }}
  */
  it('store state should have lastName = newLastName after dispatch', () => {
    // TODO dispatch FIELDS_UPDATE action seting lastName: 'newLastName'
    expect(store.getState().lastName).toBe('newLastName');
  });

  /*
  TODO 8. Dispatch an action that would update both first and last name
  { type: 'FIELDS_UPDATE', payload: {
    firstName: 'Wendy', lastName: 'Brown' }}
  */
  it('store state should update both names after dispatch', () => {
    // TODO dispatch FIELDS_UPDATE action seting firstName: 'Wendy' and
    // lastName: 'Brown'

    expect(store.getState()).toEqual({
      firstName: 'Wendy',
      lastName: 'Brown'
    });
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
  TODO 9. Using the provided Profile component along with react-redux
  create a container component CProfile which is connects your
  redux store profile data to props `firstName` and `lastName`.
  Also in connect, bind `actions.fieldsUpdate` to dispatch and
  inject as `fieldsUpdate` into props.
  Hint: you will use react-redux `connect()`
  */
  beforeEach('create container component CProfile connecting Profile', () => {
    // TODO create CProfile container component by connecting Profile
    // to the redux store.
    // TODO Connect the props: firstName and lastName.
    // TODO Bind actions.fieldsUpdate to dispatch and inject into props
    CProfile = null; // TODO replace
  });

  it('CProfile should exist', () => {
    expect(CProfile).toExist();
  });

  /*
     TODO 10. Use this new container component CProfile in the provided
     App component.
   */
  beforeEach('define App component', () => {
    App = function App1() {
      // TODO use CProfile container component
      return (
        <div>
          <h2>Redux Exercise</h2>
        </div>
      );
    };
  });


  /*
     TODO 11. In `ReactDOM.render()` wrap our App component with the
     react-redux `Provider` HOC so that it can provide store
     data through the context to our container component CProfile
   */
  beforeEach('define renderToDOM function', () => {
    renderToDOM = function () {
      return new Promise(resolve => { // resolve when done rendering
        // TODO wrap App in Provider HOC so it can provide store
        ReactDOM.render(
          <App />,
          appContainerDiv,
          () => resolve() // resolve when done rendering
        );
      });
    };
  });

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
