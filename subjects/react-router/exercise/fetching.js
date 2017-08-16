import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import times from 'lodash/times';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');

const history = createBrowserHistory();
// const history = createMemoryHistory({ initialEntries: ['/react-router/lecture.html'] });

// setTimeout(() => {
//   history.push('/react-router/dynamic/foo');
// }, 2000);

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
  fooFetchLogic,
  barFetchLogic,
  bazFetchLogic
];

const initialState = {
  foo: null,
  bar: null,
  baz: null
};

function reducer(state = initialState, action) {
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

const logicMiddleware = createLogicMiddleware(logic);
const store = createStore(reducer,
                          applyMiddleware(logicMiddleware));
store.logicMiddleware = logicMiddleware;

console.log('initial history', history.location.pathname, history.location.state);
store.dispatch({ type: `R:${history.location.pathname}` });
history.listen((location, action) => {
  console.log('history:', action, location.pathname, location.state);
  store.dispatch({ type: `R:${location.pathname}` });
});


function Foo({ foo }) {
  if (!foo) { return null; }
  return <div>Foo time {foo.first_name}</div>;
}
const CFoo = connect(
  state => ({
    foo: state.foo
  })
)(Foo);

function Bar({ bar }) {
  if (!bar) { return null; }
  return <div>Bar time {bar.first_name}</div>;
}
const CBar = connect(
  state => ({
    bar: state.bar
  })
)(Bar);

function Baz({ baz }) {
  if (!baz) { return null; }
  return <div>Baz time {baz.first_name}</div>;
}
const CBaz = connect(
  state => ({
    baz: state.baz
  })
)(Baz);

// if rending on the server, wait till fetching completes then render
// store.logicMiddleware.whenComplete(() => {
//   /* store is now updated */
//   ReactDOMServer.renderToString(...)
// });

ReactDOM.render(
  (
    <Provider store={ store }>
    <Router history={history}>
    <div>
    <h2>react-router/fetching</h2>
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
    </Router>
    </Provider>
  ),
  appContainerDiv
);
