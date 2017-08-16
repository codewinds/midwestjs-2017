import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-addons-test-utils';

const appContainerDiv = document.querySelector('#appContainer');

describe('reactjs-com/forms', () => {

  it('uncontrolled form tracks changes, submits all', done => {
    const fields = {};
    function formChange(ev) {
      const { type, name, value, checked } = ev.target;
      fields[name] = (type === 'checkbox') ? checked : value;
    }
    // TODO 1. render form with uncontrolled form components
    //         with text inputs for firstName and lastName
    //         textarea for address and checkbox for subscribe
    // TODO 2. invoke formChange fn for each field change
    // TODO 3. include a submit button with id of 'submitButton'
    // TODO 4. invoke formSubmit fn when the form is submitted
    function Foo() {
      return null; // TODO replace
    }

    function formSubmit(ev) {
      ev.preventDefault(); // prevent normal submission
      expect(fields).toEqual({
        firstName: 'Mary',
        lastName: 'Jonas',
        address: '123 Foo',
        subscribe: true
      });
      done();
    }
    ReactDOM.render(
      <Foo onChange={formChange} onSubmit={formSubmit} />,
      appContainerDiv,
      () => {
        const firstElem =
          appContainerDiv.querySelector('input[name="firstName"]');
        expect(firstElem).toExist('firstName input should exist');
        firstElem.value = 'Mary';
        Simulate.change(firstElem);
        const lastElem =
          appContainerDiv.querySelector('input[name="lastName"]');
        expect(lastElem).toExist('lastName input should exist');
        lastElem.value = 'Jonas';
        Simulate.change(lastElem);
        const address =
          appContainerDiv.querySelector('textarea[name="address"]');
        expect(address).toExist('address textarea should exist');
        address.value = '123 Foo';
        Simulate.change(address);
        const subscribe =
          appContainerDiv.querySelector('input[name="subscribe"]');
        expect(subscribe).toExist('subscribe checkbox should exist');
        subscribe.checked = true;
        Simulate.change(subscribe);
        const submitButton =
          appContainerDiv.querySelector('#submitButton');
        expect(submitButton).toExist('submit button should exist');
        submitButton.click();
      }
    );
  });


  it('controlled form tracks changes, submits all', done => {
    // TODO 5. render form with uncontrolled form components
    //         with text inputs for firstName and lastName
    //         textarea for address and checkbox for subscribe
    //         All fields should match initialState values passed down
    //         from App state to Foo as props.fields
    // TODO 6. add formChange method to invoke for all field changes
    //         it should update the state
    // TODO 7. include a submit button with id of 'submitButton'
    // TODO 8. implement formSubmit method which prevents the default
    //         submission and verfies the state matches expected

    const initialState = {
      firstName: 'myFirstName',
      lastName: 'myLastName',
      address: 'myAddress',
      subscribe: true
    };

    const expectedEndState = {
      firstName: 'John',
      lastName: 'Smith',
      address: '123 Foo',
      subscribe: false
    };

    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {}; // TODO replace
      }

      formChange(ev) {
        const { type, name, value, checked } = ev.target;
        // TODO set the state for this field
        // Hint: checkbox is slightly different
      }

      formSubmit(ev) {
        // TODO prevent default submission of form
        expect(this.state).toEqual(expectedEndState);
        done();
      }

      render() {
        const fields = this.state;
        // TODO render Foo with fields and handlers
        return (
          <div>Replace me with Foo</div>
        );
      }
    }

    /*
       TODO implement form in this component
     */
    function Foo() {
      return null; // TODO replace
    }

    ReactDOM.render(
      <App />,
      appContainerDiv,
      () => {
        const firstElem =
          appContainerDiv.querySelector('input[name="firstName"]');
        expect(firstElem).toExist('firstName input should exist');
        expect(firstElem.value).toBe('myFirstName');
        firstElem.value = 'John';
        Simulate.change(firstElem);
        const lastElem =
          appContainerDiv.querySelector('input[name="lastName"]');
        expect(lastElem).toExist('lastName input should exist');
        expect(lastElem.value).toBe('myLastName');
        lastElem.value = 'Smith';
        Simulate.change(lastElem);
        const address =
          appContainerDiv.querySelector('textarea[name="address"]');
        expect(address).toExist('address textarea should exist');
        expect(address.value).toBe('myAddress');
        address.value = '123 Foo';
        Simulate.change(address);
        const subscribe =
          appContainerDiv.querySelector('input[name="subscribe"]');
        expect(subscribe).toExist('subscribe checkbox should exist');
        expect(subscribe.checked).toBe(true);
        subscribe.checked = false;
        Simulate.change(subscribe);
        const submitButton =
          appContainerDiv.querySelector('#submitButton');
        expect(submitButton).toExist('submit button should exist');
        submitButton.click();
      }
    );
  });


});
