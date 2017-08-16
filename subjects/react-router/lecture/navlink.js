import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');

ReactDOM.render(
  (
    <Router>
    <div>
    <h2>react-router/navlink</h2>
    <ul>
    <li><NavLink to="/react-router/lecture.html">Lecture Home</NavLink></li>
    <li><NavLink to="/react-router/dynamic/foo">foo</NavLink></li>
    <li><NavLink to="/react-router/dynamic/bar">bar</NavLink></li>
    <li><NavLink to="/react-router/dynamic/baz">baz</NavLink></li>
    <li><NavLink to="/react-router/dynamic/baz/more">baz more</NavLink></li>
    </ul>
    <section>
    <Route path="/react-router/dynamic/foo" component={Foo} />
    <Route path="/react-router/dynamic/bar" render={ props => <Bar/> } />
    <Route exact path="/react-router/dynamic/baz" component={Baz} />
    <Route path="/react-router/dynamic/:abc" render={ props =>
      <div>ABC is: {props.match.params.abc}</div> } />
    <Route children={ ({match}) => <div>Always renders {match.url}</div> } />
    <Route>{ props => <div>Another always renders</div> }</Route>
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
