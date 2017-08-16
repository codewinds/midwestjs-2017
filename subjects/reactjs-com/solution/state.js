import expect from 'expect';
import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('reactjs-com/state', () => {

  it('set initial state in contructor', () => {
    class Foo extends React.Component {
      // TODO create a constructor that initializes the state
      constructor(props) {
        super(props);
        this.state = {
          a: 10,
          b: 'hello'
        };
      }

      render() { return null; }
    }
    const comp = renderIntoDocument(<Foo/>);
    expect(comp.state).toEqual({
      a: 10,
      b: 'hello'
    });
  });

  it('update several state values with obj', () => {
    class Foo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          c: 'happy',
          d: 42,
          e: false
        };
      }
      render() { return null; }
    }
    const comp = renderIntoDocument(<Foo/>);
    // TODO update c and e using comp.setState(obj)
    comp.setState({
      c: 'sad',
      e: true
    });

    expect(comp.state).toEqual({
      c: 'sad',
      d: 42,
      e: true
    });
  });

  it('update state values with function using prevState/props', () => {
    class Foo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          f: [10, 20],
          g: 100,
          h: false
        };
      }
      render() { return null; }
    }
    const comp = renderIntoDocument(<Foo msg='hey' />);
    // TODO update f using prevState.f by concatenating 30 to array
    // TODO update g by setting value to prevState.g + 1
    // TODO create i using the props.msg and append ' there'
    comp.setState((prevState, props) => ({
      f: prevState.f.concat(30),
      g: prevState.g + 1,
      i: `${props.msg} there`
    }));

    expect(comp.state).toEqual({
      f: [10, 20, 30],
      g: 101,
      h: false,
      i: 'hey there'
    });
  });

});
