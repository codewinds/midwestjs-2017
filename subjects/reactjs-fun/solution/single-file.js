import expect from 'expect';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-addons-test-utils';

const appContainerDiv = document.querySelector('#appContainer');

describe('reactjs-fun/single-file', () => {

  /*
     React.js Exercise Steps:

     TODO 1. Create a catalog component which takes a property `items`
     and displays them in a table. Items is an array of objects
     with an id and a name. You may start with a hardcoded
     array for this first step. It also should take another
     property `datetime` in which you will pass the current
     JS date. Include a formatted version of this above your
     table indicating when the data was refreshed.
   */
  it('catalog component displays items as a table', () => {
    const itemArr = [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' }
    ];
    const now = new Date();

    function Catalog({ items, datetime }) {
      return (
        <div>
        <div>Refreshed { datetime.toLocaleString() }</div>
        <table>
        <tbody>
        { items.map((item, idx) => (
          <tr key={ item.id }>
          <td>{ idx + 1 }</td>
          <td>{ item.name }</td>
          </tr> )) }
        </tbody>
        </table>
        </div>
      );
    }

    ReactDOM.render(<Catalog items={itemArr} datetime={now} />,
                    appContainerDiv);
    const rows = appContainerDiv.querySelectorAll('tr');
    expect(rows.length).toBe(itemArr.length);
    const cols = rows.item(0).querySelectorAll('td');
    expect(cols.length).toBe(2); // idx, name
  });

  /*
     TODO 2. Using axios, fetch, or similar xhr mechanism, fetch the data
     from `/fake-api.json` and use this data to render your catalog
     component. You can visit this data in your web browser
     using `http://localhost:3005/fake-api.json`
     (That mock data lives in react-family-subjects/public/fake-api.json)
   */
  it('fetch data from /fake-api.json and render', () => {
    const state = {
      items: []
    };

    function fetchDataAndRender() {
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

    function Catalog({ items, datetime }) {
      return (
        <div>
        <div>Refreshed { datetime.toLocaleString() }</div>
        <table>
        <tbody>
        { items.map((item, idx) => (
          <tr key={ item.id }>
          <td>{ idx + 1 }</td>
          <td>{ item.name }</td>
          </tr> )) }
        </tbody>
        </table>
        </div>
      );
    }


    function render() {
      const datetime = new Date();
      ReactDOM.render(<Catalog items={state.items} datetime={datetime} />,
                      appContainerDiv);
    }


    return fetchDataAndRender()
      .then(() => {
        const rows = appContainerDiv.querySelectorAll('tr');
        expect(rows.length).toBe(3);
      });

  });

  /*
     TODO 3. Create a button in your Catalog that when clicked will cause
     the data to be refreshed (refetched and rerendered). It should
     also update the `datetime` property in the process. You will
     pass in an `onRefresh` property which will be a function that
     causes the data to be refreshed and rerendered. Your button should
     live outside of the table. Also add to your state the count of
     renders, increment it each time you fetch data, and display it
     in a span with an id 'renderCount'
   */
  it('refreshes on button click', (done) => {
    const state = {
      items: [],
      renderCount: 0
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

    function Catalog({ items, datetime, renderCount, onRefresh }) {
      return (
        <div>
        <div>Refreshed { datetime.toLocaleString() }</div>
        <div>Render count: <span id='renderCount'>{ renderCount }</span></div>
        <button onClick={onRefresh}>Refresh</button>
        <table>
        <tbody>
        { items.map((item, idx) => (
          <tr key={ item.id } >
          <td>{ idx + 1 }</td>
          <td>{ item.name }</td>
          </tr> )) }
        </tbody>
        </table>
        </div>
      );
    }

    function render() {
      const datetime = new Date();
      ReactDOM.render(
        <Catalog items={state.items} datetime={datetime}
                 renderCount={state.renderCount}
                 onRefresh={fetchDataAndRender} />,
        appContainerDiv
      );
    }

    fetchDataAndRender()
      .then(() => {
        const button = appContainerDiv.querySelector('button');
        expect(button).toExist('button should exist');
        const renderCountDiv = appContainerDiv.querySelector('#renderCount');
        expect(renderCountDiv.innerText).toBe('1');
        button.click();
        setTimeout(() => { // delay to allow render to occur
          expect(renderCountDiv.innerText).toBe('2');
          done();
        }, 50);
      });

  });

  /*
     TODO 4. Create and render an app component which uses your catalog
     component passing in the data. Your app component should
     receive all its data from props passing it down to
     the catalog component's props. In this way we are beginning
     to use composition to build up our program. Your App component
     should include a div wrapping the catalog with an id of 'app'
   */
  it('create app component which renders catalog component', () => {
    const state = {
      items: [],
      renderCount: 0
    };

    function fetchDataAndRender() {
      state.renderCount += 1;
      return fetchData()
        .then(items => {
          state.items = items; // save it to our state
          render();
        });
    }

    function fetchData() {
      return axios.get('/fake-api.json')
                  .then(resp => resp.data.items); // use items property of payload
    }

    function App({ items, datetime, renderCount, onRefresh }) {
      return (
        <div id='app'>
        <Catalog items={items} datetime={datetime}
                 renderCount={renderCount} onRefresh={onRefresh} />
        </div>
      );
    }
    function Catalog({ items, datetime, renderCount, onRefresh }) {
      return (
        <div>
        <div>Refreshed { datetime.toLocaleString() }</div>
        <div>Render count: <span id='renderCount'>{ renderCount }</span></div>
        <button onClick={onRefresh}>Refresh</button>
        <table>
        <tbody>
        { items.map((item, idx) => (
          <tr key={ item.id } >
          <td>{ idx + 1 }</td>
          <td>{ item.name }</td>
          </tr> )) }
        </tbody>
        </table>
        </div>
      );
    }

    function render() {
      const datetime = new Date();
      ReactDOM.render(
        <App items={state.items} datetime={datetime}
             renderCount={state.renderCount}
             onRefresh={fetchDataAndRender} />,
        appContainerDiv
      );
    }

    return fetchDataAndRender()
      .then(() => {
        const app = appContainerDiv.querySelector('#app');
        expect(app).toExist('app div should exist');
        const table = app.querySelector('table');
        expect(table).toExist('table should exist inside app div');
      });

  });

});
