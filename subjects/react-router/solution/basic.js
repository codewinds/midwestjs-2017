import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import times from 'lodash/times';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';

const appContainerDiv = document.querySelector('#appContainer');

/*
   TODO 1. Using react-router add list of links which direct to the
   following paths. Each Link should include the className specified.

   Name | path   | component | Link className | content className
   ---------------------------------------------------------------
   Cat  | /u/cat | Cat       | catLink        | catContent
   Dog  | /u/dog | Dog       | dogLink        | dogContent
   Egg  | /u/egg | Egg       | eggLink        | eggContent

   TODO 2. Create a memoryHistory with initialEntries: ['/']
   TODO 3. Use this memoryHistory with a react-router Router
   TODO 4. Create Cat, Dog, Egg components which render a
           div with the content className specified above.
           The div should have text content "XYZ content"
           where XYZ is Cat, Dog, or Egg.
   TODO 5. Render Cat, Dog, Egg components for their routes inside of the           main section
   TODO 6. Create an additional Route which renders in all three cases
   and extracts as a parameter the value in the path after /u/
   It should render an element with className uid that
   contains this value as the text body.
 */

describe('react-router/basic', () => {
  // TODO create memoryHistory instance with initialEntries: ['/']
  const history = createMemoryHistory({ initialEntries: ['/'] });


  const Cat = () => <div className="catContent">Cat content</div>;
  const Dog = () => <div className="dogContent">Dog content</div>;
  const Egg = () => <div className="eggContent">Egg content</div>;

  function App() {
    return (
      <Router history={history}>
        <div>
          <ul className="menu">
            <Link to="/u/cat" className="catLink">Cat</Link>
            <Link to="/u/dog" className="dogLink">Dog</Link>
            <Link to="/u/egg" className="eggLink">Egg</Link>
          </ul>
          <section className="main">
            <Route path="/u/cat" component={Cat} />
            <Route path="/u/dog" component={Dog} />
            <Route path="/u/egg" component={Egg} />
          </section>
        </div>
      </Router>
    );
  }

  ReactDOM.render(<App />, appContainerDiv);

  it('should import the necessary modules', () => {
    expect(Router).toExist('Router should be imported');
    expect(Route).toExist('Route should be imported');
    expect(Link).toExist('Link should be imported');
    expect(createMemoryHistory).toExist('createMemoryHistory should be imported');
  });

  it('should create history as a memoryHistory instance', () => {
    expect(history).toExist('history should exist');
    expect(history.length).toBe(1, 'history should have one entry');
    expect(history.entries[0].pathname).toBe('/', 'entry should have pathname /');
  });

  it('Cat, Dog, Egg should render classNames', () => {
    const catDiv = renderIntoDocument(<div><Cat/></div>);
    expect(catDiv.querySelector('.catContent'))
      .toExist('Cat component should have className catContent');
    const dogDiv = renderIntoDocument(<div><Dog/></div>);
    expect(dogDiv.querySelector('.dogContent'))
      .toExist('Dog component should have className dogContent');
    const eggDiv = renderIntoDocument(<div><Egg/></div>);
    expect(eggDiv.querySelector('.eggContent'))
      .toExist('Egg component should have className eggContent');
  });

  it('should not render Cat, Dog, Egg for initial path /', () => {
    expect(appContainerDiv.querySelector('.catContent'))
      .toNotExist('Cat component should not render for /');
    expect(appContainerDiv.querySelector('.dogContent'))
      .toNotExist('Dog component should not render for /');
    expect(appContainerDiv.querySelector('.eggContent'))
      .toNotExist('Egg component should not render for /');
  });

  it('should render links for Cat, Dog, Egg', () => {
    expect(appContainerDiv.querySelector('.catLink'))
      .toExist('Link with className catLink should exist');
    expect(appContainerDiv.querySelector('.dogLink'))
      .toExist('Link with className dogLink should exist');
    expect(appContainerDiv.querySelector('.eggLink'))
      .toExist('Link with className eggLink should exist');
  });

  it('should render Cat content when Cat link is clicked', () => {
    const link = appContainerDiv.querySelector('.catLink');
    link.click();
    expect(appContainerDiv.querySelector('.catContent'))
      .toExist('Cat component should render for /u/cat');
    expect(appContainerDiv.querySelector('.dogContent'))
      .toNotExist('Dog component should not render for /u/cat');
    expect(appContainerDiv.querySelector('.eggContent'))
      .toNotExist('Egg component should not render for /u/cat');
  });

  it('should render Dog content when Dog link is clicked', () => {
    const link = appContainerDiv.querySelector('.dogLink');
    link.click();
    expect(appContainerDiv.querySelector('.dogContent'))
      .toExist('Dog component should render for /u/dog');
    expect(appContainerDiv.querySelector('.catContent'))
      .toNotExist('Cat component should not render for /u/dog');
    expect(appContainerDiv.querySelector('.eggContent'))
      .toNotExist('Egg component should not render for /u/dog');
  });

  it('should render Egg content when Egg link is clicked', () => {
    const link = appContainerDiv.querySelector('.eggLink');
    link.click();
    expect(appContainerDiv.querySelector('.eggContent'))
      .toExist('Egg component should render for /u/egg');
    expect(appContainerDiv.querySelector('.catContent'))
      .toNotExist('Cat component should not render for /u/egg');
    expect(appContainerDiv.querySelector('.dogContent'))
      .toNotExist('Dog component should not render for /u/egg');
  });

  it('should not render Cat, Dog, Egg when returning to /', () => {
    const newEntryCount = history.length - 1;
    times(newEntryCount, () => { history.goBack(); });

    expect(appContainerDiv.querySelector('.catContent'))
      .toNotExist('Cat component should not render for /');
    expect(appContainerDiv.querySelector('.dogContent'))
      .toNotExist('Dog component should not render for /');
    expect(appContainerDiv.querySelector('.eggContent'))
      .toNotExist('Egg component should not render for /');
  });


});
