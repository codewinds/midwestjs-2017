import expect from 'expect';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import { createLogic, createLogicMiddleware } from 'redux-logic';

/*
   TODO 21. Create logic that responds to NPM_SEARCH actions with
   a payload of the search string. In the process hook it should
   perform an xhr request using axios to
   `https://npmsearch.com/query?q=${searchTerms}&fields=name,description`
   and dispatch the results with action type NPM_SEARCH_FULFILLED with
   the data as the payload property.
   and if it errors it should dispatch an action of NPM_SEARCH_REJECTED
   with the payload being the error.

   TODO 22. Add a validation hook to the logic so that it silences
   the NPM_SEARCH action if the search clause is empty. It should
   use the reject callback so the process hook is not invoked.

   TODO 23. Debounce searches with a period of 0.5 seconds using the
   declarative feature in redux-logic

   TODO 24. Enable latest filtering so that if multiple requests are
   performed, only the response to the latest request will be used
   using the declarative feature in redux-logic
 */
describe('redux/logic2', function () {
  this.timeout(4000); // increase timeout to 4s

  // locate a div in our html where we want to render
  const appContainerDiv = document.querySelector('#appContainer');

  const initialState = {
    list: [],
    fetchStatus: ''
  };

  const NPM_SEARCH = 'NPM_SEARCH';
  const NPM_SEARCH_FULFILLED = 'NPM_SEARCH_FULFILLED';
  const NPM_SEARCH_REJECTED = 'NPM_SEARCH_REJECTED';
  function npmSearch(ev) {
    return { type: NPM_SEARCH, payload: ev.target.value };
  }

  const npmSearchLogic = createLogic({
    type: NPM_SEARCH, // logic only applies to this action type
    // TODO implement search logic
  });

  const arrLogic = [npmSearchLogic];
  const logicMiddleware = createLogicMiddleware(arrLogic);
  const store = createStore(reducer, initialState,
                            applyMiddleware(logicMiddleware));
  store.logicMiddleware = logicMiddleware;

  const CApp = connect(
    state => ({
      results: state.list,
      fetchStatus: state.fetchStatus
    }),
    {
      npmSearch
    }
  )(App);

  function App({ results, fetchStatus, npmSearch }) {
    return (
      <div>
        <div>Search npmsearch.com for packages</div>
        <div>Status: { fetchStatus }</div>
        <input autoFocus="true"
               className="searchInput"
               onChange={ npmSearch }
               placeholder="package keywords" />
        <ul>
          { results.map(result => (
            <li key={ result.name[0] } className="result">
              { result.name[0] } - { result.description[0] }
            </li> )) }
        </ul>
      </div>
    );
  }

  function reducer(state = initialState, action) {
    switch (action.type) {
      case NPM_SEARCH:
        return {
          ...state,
          fetchStatus: `fetching for ${action.payload}... ${(new Date()).toLocaleString()}`,
          list: []
        };
      case NPM_SEARCH_FULFILLED:
        return {
          ...state,
          list: action.payload,
          fetchStatus: `Results from ${(new Date()).toLocaleString()}`
        };
      case NPM_SEARCH_REJECTED:
        return {
          ...state,
          fetchStatus: `errored: ${action.payload}`
        };
      default:
        return state;
    }
  }

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

  beforeEach('render CApp', done => {
    ReactDOM.render(
      <Provider store={ store }>
        <CApp />
      </Provider>,
      appContainerDiv,
      () => done() // done rendering
    );
  });

  it('should find results when a term is entered', () => {
    const searchElem = appContainerDiv.querySelector('.searchInput');
    searchElem.value = 'hapi';
    Simulate.change(searchElem);
    return store.logicMiddleware.whenComplete(() => {
      const resultNodeList = appContainerDiv.querySelectorAll('.result');
      expect(resultNodeList.length).toBeGreaterThan(0);
    });
  });

  it('should not change if value is cleared, invalid', () => {
    const searchElem = appContainerDiv.querySelector('.searchInput');
    searchElem.value = 'apple';
    Simulate.change(searchElem);
    return store.logicMiddleware.whenComplete()
      .then(() => {
        searchElem.value = '';
        Simulate.change(searchElem);
        return store.logicMiddleware.whenComplete(() => {
          const resultNodeList = appContainerDiv.querySelectorAll('.result');
          expect(resultNodeList.length).toBeGreaterThan(0);
        });
      });
  });

});
