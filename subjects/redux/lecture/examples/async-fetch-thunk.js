import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';

const appContainerDiv = document.querySelector('#appContainer');

const actions = {
  itemFetch(ev) {
    // return a thunk function
    return (dispatch, getState) => {
      dispatch({ type: 'ITEM_FETCH' });
      return axios.get('/fake-api.json')
           .then(resp => resp.data.items) /* items property of payload */
           .then(items => dispatch({
             type: 'ITEM_FETCH_SUCCESS',
             payload: items
           }))
           .catch(err => dispatch({
             type: 'ITEM_FETCH_FAILED',
             payload: err,
             error: true
           }));
    };
  }
};

const initialState = {
  status: '',
  items: []
};

function rootReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'ITEM_FETCH':
      return {
        ...state,
        status: 'fetching...'
      };
    case 'ITEM_FETCH_SUCCESS':
      return {
        ...state,
        items: action.payload,
        status: ''
      };
    case 'ITEM_FETCH_FAILED':
      return {
        ...state,
        status: action.payload.toString()
      };
    default:
      return state;
  }
}

const enhancer = compose(
  applyMiddleware(thunk),
  (window.devToolsExtension) ?
    window.devToolsExtension() :
    f => f
);
const store = createStore(rootReducer, undefined, enhancer);

function Catalog({ items, status, fetchItem }) {
  return (
    <div>
    <h2>Catalog (thunk)</h2>
    <div>Status: {status}</div>
    <button onClick={fetchItem}>Fetch</button>
    <ul>
    { items.map(item => (
      <li key={item.id}>{ item.name }</li>)) }
    </ul>
    </div>
  );
}

const CCatalog = connect(
  state => ({
    items: state.items,
    status: state.status
  }),
  {
    fetchItem: actions.itemFetch
  }
)(Catalog);

function App() {
  return (
    <div>
      <CCatalog />
    </div>
  );
}

ReactDOM.render(<Provider store={store} >
                  <App />
                </Provider>,
                appContainerDiv);
