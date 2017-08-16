import React from 'react';
import { renderToString } from 'react-dom/server';
import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createLogic, createLogicMiddleware } from 'redux-logic';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { ConnectedRouter, routerReducer, routerMiddleware,
         push, CALL_HISTORY_METHOD } from 'react-router-redux';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');

const history = createMemoryHistory({ initialEntries: ['/react-router/dynamic/foo'] });


const locChangeLogic = createLogic({
  type: '@@router/LOCATION_CHANGE',
  process({ action }) {
    // don't use on server, it occurs too late (during render)
    // because of componentWillMount call
    // we will not be changing the route on the server
    if (typeof document === 'undefined') { return undefined; }
    return { type: `R:${action.payload.pathname}` };
  }
});

const fooFetchLogic = createLogic({
  type: 'R:/react-router/dynamic/foo',
  process({ getState, action }) {
    return axios.get('https://reqres.in/api/users/1')
                .then(res => res.data.data) // data property of json
                .then(data => ({ type: 'FOO_SUCCESS', payload: data }));
  }
});
const barFetchLogic = createLogic({
  type: 'R:/react-router/dynamic/bar',
  process({ getState, action }) {
    return axios.get('https://reqres.in/api/users/2')
                .then(res => res.data.data) // data property of json
                .then(data => ({ type: 'BAR_SUCCESS', payload: data }));
  }
});
const bazFetchLogic = createLogic({
  type: 'R:/react-router/dynamic/baz',
  process({ getState, action }) {
    return axios.get('https://reqres.in/api/users/3')
                .then(res => res.data.data) // data property of json
                .then(data => ({ type: 'BAZ_SUCCESS', payload: data }));
  }
});
const logic = [
  locChangeLogic,
  fooFetchLogic,
  barFetchLogic,
  bazFetchLogic
];

const initialState = {
  foo: null,
  bar: null,
  baz: null
};

function mainReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'FOO_SUCCESS':
      return {
        ...state,
        foo: action.payload
      };
    case 'BAR_SUCCESS':
      return {
        ...state,
        bar: action.payload
      };
    case 'BAZ_SUCCESS':
      return {
        ...state,
        baz: action.payload
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  main: mainReducer,
  router: routerReducer
});
const logicMiddleware = createLogicMiddleware(logic);
const store = createStore(rootReducer,
                          applyMiddleware(
                            routerMiddleware(history),
                            logicMiddleware));

store.logicMiddleware = logicMiddleware;

console.log('initial history', history.location.pathname, history.location.state);
// store.dispatch({ type: `R:${history.location.pathname}` });
// history.listen((location, action) => {
//   console.log('history:', action, location.pathname, location.state);
//   store.dispatch({ type: `R:${location.pathname}` });
// });


function Foo({ foo }) {
  if (!foo) { return null; }
  return <div>Foo time {foo.first_name}</div>;
}
const CFoo = connect(
  state => ({
    foo: state.main.foo
  })
)(Foo);

function Bar({ bar }) {
  if (!bar) { return null; }
  return <div>Bar time {bar.first_name}</div>;
}
const CBar = connect(
  state => ({
    bar: state.main.bar
  })
)(Bar);

function Baz({ baz }) {
  if (!baz) { return null; }
  return <div>Baz time {baz.first_name}</div>;
}
const CBaz = connect(
  state => ({
    baz: state.main.baz
  })
)(Baz);

// store.logicMiddleware.monitor$.subscribe(x => console.log(JSON.stringify(x, null, 2)));
// store.logicMiddleware.monitor$.subscribe(x => console.log(x));

// dispatch path
// store.dispatch(push('/react-router/dynamic/foo')); /* should work */

// need to dispatch since location_change will fire during render
store.dispatch({ type: `R:${history.location.pathname}` });

//store.dispatch({ type: 'R:/react-router/dynamic/foo' });

// if rending on the server, wait till fetching completes then render
store.logicMiddleware.whenComplete(() => {
//  console.log('whenComplete completed');
//   /* store is now updated */
//   ReactDOMServer.renderToString(...)
// });

  const html = renderToString(
    (
      <Provider store={ store }>
      <ConnectedRouter history={history}>
      <div>
      <h2>react-router/redux-server</h2>
      <ul>
      <li><Link to="/react-router/lecture.html">Lecture Home</Link></li>
      <li><Link to="/react-router/dynamic/foo">foo</Link></li>
      <li><Link to="/react-router/dynamic/bar">bar</Link></li>
      <li><Link to="/react-router/dynamic/baz">baz</Link></li>
      </ul>
      <section>
      <Route path="/react-router/dynamic/foo" component={CFoo} />
      <Route path="/react-router/dynamic/bar" component={CBar} />
      <Route path="/react-router/dynamic/baz" component={CBaz} />
      </section>
      </div>
      </ConnectedRouter>
      </Provider>
    )
  );

  // normally you would be sending the html from server
  // Here I am just injecting it so you can see it renders
  appContainerDiv.innerHTML = html; // just for easy viewing
});
