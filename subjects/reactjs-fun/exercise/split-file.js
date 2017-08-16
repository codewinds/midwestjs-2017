import expect from 'expect';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const appContainerDiv = document.querySelector('#appContainer');

describe('reactjs-fun/split-file', () => {

  /*
     TODO 5. Move your catalog component to a separate file which uses
     `export default Catalog;` to export your component.
     Then in this file, `import Catalog from './catalog';` using
     whatever filename you moved the code into.
     By separating the code into different files we are modularizing
     our codebase, helping us to focus on one component at a time.
   */

  /*
     TODO 6. Create another Profile component in a separate file and import
     that component and add it below your Catalog component in your App.
     It should take two properties `firstName` and `lastName`.
     It should display the fullname when it renders.
     Pass this new data in as props to App and have it pass it down
     to your Profile component. Hardcode the data for the profile.
     Set the Profile's outer most element's id to 'profile'
   */

  /*
     TODO 7. Add some basic PropTypes for Catalog and Profile
   */

  /*
     TODO 8. Add `even` and `odd` class to your table rows. Hint: you will be
     setting the attribute `className`.
   */

  const state = {
    items: [],
    renderCount: 0,
    profile: {
      firstName: 'John',
      lastName: 'Smith'
    }
  };

  function fetchDataAndRender() {
    state.renderCount += 1;
    return fetchData()
      .then(items => {
        state.items = items; // save it to our state
        render();
        return items;
      });
  }

  function fetchData() {
    return axios.get('/fake-api.json')
                .then(resp => resp.data.items); // use items property of payload
  }

  function render() {
    const datetime = new Date();
    ReactDOM.render(<App items={state.items} datetime={datetime}
                         onRefresh={fetchDataAndRender} />,
                    appContainerDiv);
  }

  // TODO use Catalog component here
  // TODO use Profile component here
  function App() {
    return (
      <div>use Catalog component here</div>
    );
  }


  beforeEach('fetch and render', () => {
    return fetchDataAndRender();
  });

  it('App component should compose in Catalog from separate module', () => {
    const appDiv = appContainerDiv.querySelector('#app');
    expect(appDiv).toExist('app div should exist');
    const catalogTable = appDiv.querySelector('table');
    expect(catalogTable).toExist('catalog should exist');
  });

  it('App component should compose in Profile from separate module', () => {
    const appDiv = appContainerDiv.querySelector('#app');
    const profile = appDiv.querySelector('#profile');
    expect(profile).toExist('profile should exist');
    expect(profile.textContent).toInclude(state.profile.firstName);
    expect(profile.textContent).toInclude(state.profile.lastName);
  });

  it('Catalog and Profile should have propTypes', () => {
    expect(Catalog.propTypes).toBeAn(Object, 'catalog should have propTypes object');
    expect(Object.keys(Catalog.propTypes).sort()).toEqual([
      'datetime', 'items', 'onRefresh', 'renderCount'
    ]);
    expect(Profile.propTypes).toBeAn(Object, 'profile should have propTypes object');
    expect(Object.keys(Profile.propTypes).sort()).toEqual([
      'firstName', 'lastName'
    ]);
  });

  it('Catalog table rows should have alternating even/odd class', () => {
    const evenTRs = appContainerDiv.querySelectorAll('tr.even');
    const oddTRs = appContainerDiv.querySelectorAll('tr.odd');
    expect(evenTRs.length).toBe(1, 'there should be one table row with class even');
    expect(oddTRs.length).toBe(2, 'there should be two table rows with class odd');
  });


});
