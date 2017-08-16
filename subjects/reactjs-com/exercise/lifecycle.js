import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { renderIntoDocument } from 'react-addons-test-utils';

const appContainerDiv = document.querySelector('#appContainer');

describe('reactjs-com/lifecycle', () => {

  it('fetch data from /fake-api.json on mount, display, call checkSolution', done => {
    class Foo extends React.Component {
      // TODO 1. decide which lifecycle method to implement
      // TODO 2. fetch data /fake-api.json in it with axios
      // TODO 3. update component state `items` with the results
      // TODO 4. after the updated state renders, call
      //         this.checkSolution() to check everything

      constructor(props) {
        super(props);
      }


      checkSolution() {
        expect(this.state).toExist('state should exist');
        expect(this.state.items).toExist('state.items should exist');
        expect(this.state.items.length).toBe(3);
        const itemNodeList = appContainerDiv.querySelectorAll('.item');
        expect(itemNodeList.length).toBe(3); // match public/fake-api.json
        done();
      }

      render() {
        if (!this.state) { return null; } // nothing to display
        const { items } = this.state;
        return (
          <ul>
            { items.map(x =>
              <li className="item" key={x.id}>{x.name}</li> ) }
          </ul>
        );
      }
    }

    ReactDOM.render(<Foo />, appContainerDiv);
  });

  it('update state from initial props and on every update', done => {
    // TODO update state.lowerCaseName with the lowercase of props.name
    // on construction and everytime the props.name changes
    class Foo extends React.Component {
      // TODO 5. update the state.lowerCaseName in constructor
      //         so that it is the lowercase of props.name
      // TODO 6. decide which lifecycle method(s) to implement
      //         so that you can update the state when props change
      // TODO 7. update the state when props.name changes

      constructor(props) {
        super(props);
      }


      render() {
        if (!this.state) { return null; } // nothing to display
        const { lowerCaseName } = this.state;
        return <div id="lcName">{ lowerCaseName }</div>;
      }
    }

    ReactDOM.render(
      <Foo name="John" />,
      appContainerDiv,
      () => {
        const lcNameDiv = appContainerDiv.querySelector('#lcName');
        expect(lcNameDiv).toExist('lcNameDiv should exist');
        expect(lcNameDiv.textContent).toBe('john');
        ReactDOM.render(
          <Foo name="Marsha" />,
          appContainerDiv,
          () => {
            const lcNameDiv = appContainerDiv.querySelector('#lcName');
            expect(lcNameDiv.textContent).toBe('marsha');
            done();
          }
        );
      }
    );
  });

});
