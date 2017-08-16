import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');

/*
   Only the first Route that matches inside Switch will render
 */
ReactDOM.render(
  (
    <Router>
    <div>
    <h2>react-router/switch</h2>
    <ul>
    <li><Link to="/react-router/lecture.html">Lecture Home</Link></li>
    <li><Link to="/react-router/dynamic/foo">foo</Link></li>
    <li><Link to="/react-router/dynamic/bar">bar</Link></li>
    <li><Link to="/react-router/dynamic/baz">baz</Link></li>
    <li><Link to="/react-router/dynamic/baz/more">baz more</Link></li>
    </ul>
    <section>
    <Switch>
      <Route path="/react-router/dynamic/foo" component={Foo} />
      <Route path="/react-router/dynamic/bar" render={ props => <Bar/> } />
      <Route exact path="/react-router/dynamic/baz" component={Baz} />
      <Route children={ ({match}) => <div>Always renders {match.url}</div> } />
      <Route>{ props => <div>Another always renders</div> }</Route>
    </Switch>
    </section>
    </div>
    </Router>
  ),
  appContainerDiv
);

function Foo({ match }) {
  return <div>Foo time</div>;
}

function Bar({ match }) {
  return <div>Bar time</div>;
}

function Baz({ match }) {
  return <div>Baz time</div>;
}
