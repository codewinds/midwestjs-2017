import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rxjs';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createLogic, createLogicMiddleware } from 'redux-logic';

const { Observable } = Rx;
const { ajax } = Observable;

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
  type: NPM_SEARCH,
  debounce: 500, // ms
  latest: true, // take latest only

  validate({ getState, action }, allow, reject) {
    if (action.payload) {
      allow(action);
    } else { // empty request, silently reject
      reject();
    }
  },

  processOptions: {
    successType: NPM_SEARCH_FULFILLED, // action type for success
    failType: NPM_SEARCH_REJECTED // action type for failures
  },

  process({ getState, action }) {

    return ajax({
      url: `https://npmsearch.com/query?q=${action.payload}&fields=name,description`,
      crossDomain: true,
      responseType: 'json'
    })
      .map(ret => ret.response.results); // use results prop of payload
  }
});

const deps = { // injected dependencies for logic
  httpClient: ajax
};
const arrLogic = [npmSearchLogic];
const logicMiddleware = createLogicMiddleware(arrLogic, deps);
const store = createStore(reducer, initialState,
                          applyMiddleware(logicMiddleware));

const ConnectedApp = connect(
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
             onChange={ npmSearch }
             placeholder="package keywords" />
      <ul>
        { results.map(result => (
          <li key={ result.name[0] }>
            { result.name[0] } - { result.description[0] }
          </li> )) }
      </ul>
    </div>
  );
}

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedApp />
  </Provider>,
  document.getElementById('appContainer')
);

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
