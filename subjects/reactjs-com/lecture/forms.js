import '../util/polyfill'; // first import polyfills
import React from 'react';
import ReactDOM from 'react-dom';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');


/*
   forms - full example uncontrolled
 */
/*
const fields = {};
function formChange(ev) {
  const { type, name, value, checked } = ev.target;
  fields[name] = (type === 'checkbox') ? checked : value;
}
function formSubmit(ev) {
  ev.preventDefault(); // prevent normal submission
  console.log('formSubmit', JSON.stringify(fields, null, 2));
}
function Foo({ onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="verticalForm">
      <h2>Uncontrolled</h2>
      <input name="fullName" onChange={onChange} placeholder="Full Name" />
      <textarea name="address" onChange={onChange} placeholder="Address" />
      <input name="country" defaultValue="USA" onChange={onChange}
    placeholder="Country" />
      <label>Gift
        <input name="gift" type="checkbox" defaultChecked
               onChange={onChange} />
      </label>
      <select name="size" defaultValue="M" onChange={onChange} >
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
      </select>
      <fieldset>
        <legend>Modulation</legend>
        <label>AM
          <input type="radio" name="mod" value="AM" onChange={onChange} />
        </label>
        <label>FM
          <input type="radio" name="mod" value="FM" defaultChecked onChange={onChange} />
        </label>
      </fieldset>
      <button>Submit</button>
    </form>
  );
}
ReactDOM.render(
  <Foo onChange={formChange} onSubmit={formSubmit} />,
  appContainerDiv
);
*/


/*
   JSX - controlled inputs
 */
/*
const fields = {
  fullName: 'John Smith',
  address: '123 Foo',
  country: 'Poland',
  gift: true,
  size: 'L',
  mod: 'AM'
};
function formChange(ev) {
  const { type, name, value, checked } = ev.target;
  fields[name] = (type === 'checkbox') ? checked : value;
  render();
}
function formSubmit(ev) {
  ev.preventDefault(); // prevent normal submission
  console.log('formSubmit', JSON.stringify(fields, null, 2));
}
function Foo({ fields, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="verticalForm">
      <h2>Controlled</h2>
      <input name="fullName" value={fields.fullName} onChange={onChange}
             placeholder="Full Name" />
      <textarea name="address" value={fields.address} onChange={onChange}
                placeholder="Address" />
      <input name="country" value={fields.country} onChange={onChange}
             placeholder="Country" />
      <label>Gift
        <input name="gift" type="checkbox" checked={fields.gift}
               onChange={onChange} />
      </label>
      <select name="size" value={fields.size} onChange={onChange} >
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
      </select>
      <fieldset>
        <legend>Modulation</legend>
        <label>AM
          <input type="radio" name="mod" value="AM"
                 checked={fields.mod === 'AM'} onChange={onChange} />
        </label>
        <label>FM
          <input type="radio" name="mod" value="FM"
                 checked={fields.mod === 'FM'} onChange={onChange} />
        </label>
      </fieldset>
      <button>Submit</button>
    </form>
  );
}
function render() {
  ReactDOM.render(
    <Foo fields={fields} onChange={formChange} onSubmit={formSubmit} />,
    appContainerDiv
  );
}
render();
*/
