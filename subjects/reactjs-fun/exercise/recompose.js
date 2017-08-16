import expect from 'expect';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import {find, set, unset, toPairs} from 'lodash/fp';
import { compose, defaultProps, mapProps, withProps,
  withPropsOnChange, renameProp, renameProps,
  withState, withHandlers, flattenProp, withReducer,
  branch, renderComponent, renderNothing, shouldUpdate, pure,
  onlyUpdateForKeys, onlyUpdateForPropTypes, withContext,
  getContext, lifecycle, setPropTypes, componentFromProp,
  hoistStatics } from 'recompose';

const appContainerDiv = document.querySelector('#appContainer');

describe('reactjs-fun/recompose', () => {
  let renderCount = 0;
  let lastProps = {};

  const EchoProps = props => {
    console.log('props', props);
    renderCount += 1;
    lastProps = props;
    return (
      <ul>
      { toPairs(props).map(([key, value]) =>
        <li key={key}>{key}: {value}</li> ) }
      </ul>
    );
  };

  let div;
  beforeEach(() => {
    renderCount = 0;
    lastProps = undefined;
    div = document.createElement('div');
  });

  /*
     TODO 11. Using recompose, create a pure component that only updates if any prop changes
   */
  it('should render a pure component that only updates if a prop changes', () => {
    const Comp = undefined; // TODO wrap EchoProps with HOC from recompose

    expect(Comp).toExist('Comp should exist');
    ReactDOM.render(<Comp foo={1} />, div);
    ReactDOM.render(<Comp foo={1} />, div);
    ReactDOM.render(<Comp foo={2} />, div);
    expect(renderCount).toBe(2);
  });

  /*
     TODO 12. Using recompose, create a pure component that only updates if foo or bar props change
   */
  it('should render a pure component that only updates if foo or bar props change', () => {
    const Comp = undefined; // TODO wrap EchoProps with HOC from recompose

    expect(Comp).toExist('Comp should exist');
    ReactDOM.render(<Comp foo={1} bar={10} baz={100} />, div);
    ReactDOM.render(<Comp foo={1} bar={10} baz={101} />, div);
    ReactDOM.render(<Comp foo={2} bar={10} baz={103} />, div);
    expect(renderCount).toBe(2);
  });

  /*
     TODO 13. Using recompose, remap property names from data to the expected names
   */
  it('should remap property names', () => {
    const data = {
      FOO: 1,
      BAR: 2,
      BAZ: 3
    };

    const Comp = undefined; // TODO wrap EchoProps with HOC from recompose

    expect(Comp).toExist('Comp should exist');
    ReactDOM.render(<Comp {...data} />, div);
    expect(lastProps).toEqual({
      foo: 1,
      bar: 2,
      baz: 3
    });
  });


  /*
     TODO 14. Using recompose, handle form state and provide onChange and onSubmit handlers to a stateless fn component
   */
  it('should handle form state and provide handlers', done => {
    const Form1 = ({ values, onChange, onSubmit }) => {
      console.log('rendering values:', values);
      return (
        <form onSubmit={onSubmit}>
        <input name="itemName" value={values.itemName} onChange={onChange} />
        <input name="desc" value={values.desc} onChange={onChange} />
        <button>Submit</button>
        </form>
      );
    };

    let lastSubmitValues; // TODO in the onSubmit handler set this to the values submitted
    const Comp = undefined; // TODO wrap EchoProps with HOC from recompose

    expect(Comp).toExist('Comp should exist');
    ReactDOM.render(<Comp />, div, () => {
      Simulate.change(div.querySelector('input[name="itemName"]'),
        { target: { name: 'itemName', value: 'Tacos' }});
      Simulate.change(div.querySelector('input[name="desc"]'),
        { target: { name: 'desc', value: 'Pork filled tacos' }});
      div.querySelector('button').click();
      expect(lastSubmitValues).toEqual({
        itemName: 'Tacos',
        desc: 'Pork filled tacos'
      });
      done();
    });
  });

  /*
     TODO 15. Using recompose, render a different component if a property matches certain criteria
   */
  it('should render different component if matches a criteria', done => {
    const Loading = props => <div className="loading">Loading...</div>;
    const Loaded = ({ data }) => <div className="loaded">Loaded { data }</div>;

    // wrap with HOC that renders the Loading component if the data prop is falsy
    const Comp = undefined; // TODO wrap EchoProps with HOC from recompose

    expect(Comp).toExist('Comp should exist');
    ReactDOM.render(<Comp />, div, () => {
      console.log(div.innerHTML);

      expect(div.querySelector('.loading')).toExist();
      expect(div.querySelector('.loaded')).toNotExist();

      ReactDOM.render(<Comp data="foo" />, div, () => {
        console.log(div.innerHTML);
        expect(div.querySelector('.loading')).toNotExist();
        expect(div.querySelector('.loaded')).toExist();
        done();
      });
    });
  });


  /*
     TODO 16. Using recompose, create an HOC wrapped stateless fn component that displays a Loading message while loading, fetches data with axios when the component mounts, and updates to display the data.
   */
  it('should be able to fetch data on mount and update when loaded', done => {
    const Loading = props => <div className="loading">Loading...</div>;
    const MainContent = ({ items }) => (
      <div className="loaded">
        <h1>Loaded</h1>
        <ul>
        { items.map(item =>
          <li key={item.id}>{item.name}</li> )}
        </ul>
      </div>
    );

    // TODO wrap whith HOC such that:
    //  a. renders Loading component when items are not loaded
    //  b. uses axios to fetch /fake-api.json when the component mounts
    //  c. passes the items down to the component when available and renders
    const DynamicContent = undefined; // TODO wrap MainContent with HOC from recompose

    expect(DynamicContent).toExist('DynamicContent should exist');
    ReactDOM.render(<DynamicContent />, div, () => {
      console.log(div.innerHTML);
      expect(div.querySelector('.loading')).toExist();
      expect(div.querySelector('.loaded')).toNotExist();

      fetchPromise
        .then(() => {
          expect(div.querySelector('.loading')).toNotExist();
          expect(div.querySelector('.loaded')).toExist();
          expect(div.querySelectorAll('li').length).toBe(3);
          done();
        });
    });
  });


});
