import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-addons-test-utils';

const appContainerDiv = document.querySelector('#appContainer');

describe('reactjs-com/jsx', () => {

  it('passing variable and function as props', () => {
    let fooButton;
    let clickCount = 0;
    function buttonClickedFn() {
      clickCount += 1;
      renderFn();
    }

    /*
       TODO create Foo component which renders a button
       TODO 1. render a button with the text "Click me N" where N is
               the click count
       TODO 2. pass the buttonClickedFn in as a property and hook it
               up to button clicks
     */
    function Foo({ buttonClicked, count }) {
      return <button onClick={buttonClicked} id="foo">Click me {count}</button>;
    }

    function renderFn() {
      // TODO 3. render the Foo component passing in the necessary props
      ReactDOM.render(
        <Foo buttonClicked={buttonClickedFn} count={clickCount} />,
        appContainerDiv,
        () => {
          fooButton = appContainerDiv.querySelector('#foo');
        }
      );
    }

    renderFn();
    expect(fooButton).toExist('button should exist');
    Simulate.click(fooButton);
    expect(clickCount).toBe(1, 'click count should be 1');
    expect(fooButton.textContent).toBe('Click me 1', 'button should say Click me 1');
    Simulate.click(fooButton);
    expect(clickCount).toBe(2, 'click count should be 2');
    expect(fooButton.textContent).toBe('Click me 2', 'button should say Click me 2');
  });

  it('rendering raw html', () => {
    /*
       TODO 4. render raw HTML '<b>Raw HTML</b>' in a component
       Hint: pass in via a property function from ReactDOM.render
     */
    function Foo({ htmlFn }) {
      return <div dangerouslySetInnerHTML={{ __html: htmlFn() }} />;
    }
    function htmlRender() {
      return '<b>Raw HTML</b>';
    }
    ReactDOM.render(<Foo htmlFn={htmlRender} />, appContainerDiv);
    const bElem = appContainerDiv.querySelector('b');
    expect(bElem).toExist('<b>Raw HTML</b> should exist');
    expect(bElem.textContent).toBe('Raw HTML');
  });

});
