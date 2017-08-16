import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');

let authenticated = true;

ReactDOM.render(
  (
    <Router>
    <div>
    <h2>react-router/redirect</h2>
    <ul>
    <li><Link to="/react-router/lecture.html">Lecture Home</Link></li>
    <li><Link to="/react-router/dynamic/bar">bar</Link></li>
    <li><Link to="/react-router/dynamic/baz">baz</Link></li>
    <li><Link to="/react-router/dynamic/baz/more">baz more</Link></li>
    </ul>
    <section>
    <Route path="/react-router/lecture.html" render={ prefs =>
      (authenticated) ?
        <Redirect to="/react-router/dynamic/foo" /> :
        <UnauthenticatedLecture /> } />
    <Route path="/react-router/dynamic/foo" component={Foo} />
    <Route path="/react-router/dynamic/bar" component={Bar} />
    <Route exact path="/react-router/dynamic/baz" component={Baz} />
    <Route children={ ({match}) => <div>Always renders {match.url}</div> } />
    <Route>{ props => <div>Another always renders</div> }</Route>
    </section>
    </div>
    </Router>
  ),
  appContainerDiv
);

function UnauthenticatedLecture({ match }) {
  return <div>Unauthenticated lecture</div>;
}

function Foo({ match }) {
  return <div>Foo time</div>;
}

function Bar({ match }) {
  return <div>Bar time</div>;
}

function Baz({ match }) {
  return <div>Baz time</div>;
}
