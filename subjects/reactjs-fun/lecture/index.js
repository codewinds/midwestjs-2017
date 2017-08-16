import '../util/polyfill'; // first import polyfills
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {createSelector} from 'reselect';
import {compose, find, set, unset} from 'lodash/fp';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');

/* stateless function component */

function App({ prefix }) {
  return (
    <div>
    <h1>{ prefix } React.js Rocks!!</h1>
    <div>using React.js stateless function component</div>
    <h2>React.js is V=f(x)</h2>
    <ul>
    <li>Compatible with functional code + immutable values</li>
    <li>Simple to learn</li>
    <li>Composable Components</li>
    <li>Easy to migrate existing projects</li>
    <li>Path to native and desktops</li>
    </ul>
    </div>
  );
}


/* ES6 class component */
// class App extends React.Component {
//   render() {
//     const { prefix } = this.props;
//     return (
//       <div>
//       <h1>{ prefix } Workshop members!!!</h1>
//       <div>using ES6 class component</div>
//       </div>
//     );
//   }
// }

/* old createClass way */
// const App = React.createClass({
//   render() {
//     return <div>Old way</div>;
//   }
// });

/* without JSX */
// function App({ prefix }) {
//   return React.createElement('div', {},
//                              React.createElement('h1', {},
//                                                  `${prefix} React.js!`));
// }


/* Render function for above content, enable for start */
const greeting = 'Hello';
ReactDOM.render(
  <App prefix={greeting} />,
  appContainerDiv,
  () => {  /* optional cb is called when done rendering */
    console.log('rendered');
  }
);


/* example with id and className */
// function App({ prefix }) {
//   return (
//     <div id="app" className="message">{ prefix } Workshop members</div>
//   );
// }
// ReactDOM.render(<App prefix="Hey" />, appContainerDiv);

/* re-rendering */

// function render() {
//   const now = new Date();
//   ReactDOM.render(<div>The time is: { now.toLocaleString() }</div>,
//                   appContainerDiv);
// }
//
// setInterval(render, 1000);


/* composition */

// ReactDOM.render(<App />, appContainerDiv);
//
// function App() {
//   return (
//     <div>
//       <Heading />
//       <Foo />
//     </div>
//   );
// }
//
// function Heading() {
//   return (
//     <h1>My heading</h1>
//   );
// }
//
// function Foo() {
//   return (
//     <div>Foo</div>
//   );
// }


/* fetching data with Axios, iterating with map */
// import axios from 'axios';
//
// axios.get('/fake-api.json')
//   .then(resp => resp.data.items)
//   .then(items => render(items));
//
// function render(items) {
//   ReactDOM.render(<App widgets={items} />, appContainerDiv);
// }
//
// function App({ widgets }) {
//   return (
//     <div>
//       <h1>Widgets</h1>
//       <ul>
//       { widgets.map(w => (
//           <li key={w.id}>{w.name}</li> )) }
//       </ul>
//     </div>
//   );
// }


/* conditional logic using && */

// ReactDOM.render(<App navShown={true} />, appContainerDiv);
//
// function App({ navShown }) {
//   return (
//     <div>
//       { navShown && <Nav /> }
//       <div>main content</div>
//     </div>
//   );
// }
//
// function Nav() {
//   return (
//     <section>Nav here</section>
//   );
// }


/* conditional logic using functions */

// ReactDOM.render(<App navShown={true} />, appContainerDiv);
//
// function App({ navShown }) {
//   return (
//     <div>
//       { navDisplay() }
//       <div>main content</div>
//     </div>
//   );
//
//   function navDisplay() {
//     if (!navShown) { return null; }
//     return <Nav />;
//   }
// }
//
// function Nav() {
//   return (
//     <section>Nav here</section>
//   );
// }



/* button onClick */

// function buyClicked(ev) {
//   console.log('buyClicked', ev.target);
// }
//
// ReactDOM.render(<App buyClicked={buyClicked} />, appContainerDiv);
//
// function App({ buyClicked }) {
//   return (
//       <button onClick={buyClicked}>Buy</button>
//   );
// }



/* forms */

// ReactDOM.render(<App formChange={formChange}
//   formSubmit={formSubmit} />, appContainerDiv);
//
// function App({ formChange, formSubmit }) {
//   return (
//     <form onSubmit={formSubmit} >
//     <input name="first" placeholder="First Name"
//     onChange={formChange} />
//     <input name="last" placeholder="last Name"
//     onChange={formChange} />
//     <button>Submit</button>
//     </form>
//   );
// }
//
// function formChange(ev) {
//   console.log('formChange', ev.target.name, ev.target.value);
// }
//
// function formSubmit(ev) {
//   ev.preventDefault();  /* prevent the normal form submit */
//   console.log('formSubmit');
// }



/* prop types
   https://facebook.github.io/react/docs/reusable-components.html#prop-validation */
// function App({ greeting }) {
//   return (
//     <div>{ greeting } Workshop members</div>
//   );
// }
// App.propTypes = {
//   greeting: PropTypes.string.isRequired
// };
//
// const greeting = 'Hello';
// ReactDOM.render(<App greeting={greeting} />, appContainerDiv);



/* naive combining selectors with calculations */
// const state = {
//   items: [
//     { id: 1, name: 'Foo', catId: 20 },
//     { id: 2, name: 'Bar', catId: 30 }
//   ],
//   categories: [
//     { catId: 20, name: 'Games' },
//     { catId: 30, name: 'Business' }
//   ]
// };
//
// const itemsSelector = state => state.items;
// const categoriesSelector = state => state.categories;
//
// const itemsWithCategoriesSelector = state => {
//   console.log('calculating categories for items');
//   const items = itemsSelector(state);
//   const categories = categoriesSelector(state);
//   const findCategory = catId => find(c => c.catId === catId)(categories);
//
//   const itemsWithCategories = items.map(i => {
//     const category = findCategory(i.catId);
//     return compose(
//       set('category', category),
//       unset('catId')
//     )(i);
//   });
//
//   return itemsWithCategories;
// };
//
// const itemsWithCategories = itemsWithCategoriesSelector(state);
//
// console.log('itemsWithCategories', JSON.stringify(itemsWithCategories, null, 2));
//
// itemsWithCategoriesSelector(state);
// itemsWithCategoriesSelector(state);





/* reselect - for creating memoized selectors */
// const state = {
//   items: [
//     { id: 1, name: 'Foo', catId: 20 },
//     { id: 2, name: 'Bar', catId: 30 }
//   ],
//   categories: [
//     { catId: 20, name: 'Games' },
//     { catId: 30, name: 'Business' }
//   ]
// };
//
// const itemsSelector = state => state.items;
// const categoriesSelector = state => state.categories;
//
// const itemsWithCategoriesSelector = createSelector(
//   /* simple light selectors */
//   itemsSelector,
//   categoriesSelector,
//
//   /* complex expensive computation to memoize */
//   (items, categories) => {
//     console.log('calculating categories for items');
//     const findCategory = catId => find(c => c.catId === catId)(categories);
//
//     const itemsWithCategories = items.map(i => {
//       const category = findCategory(i.catId);
//       return compose(
//         set('category', category),
//         unset('catId')
//       )(i);
//     });
//
//     return itemsWithCategories;
//   }
// );
//
// const itemsWithCategories = itemsWithCategoriesSelector(state);
//
// console.log('itemsWithCategories', JSON.stringify(itemsWithCategories, null, 2));
//
// itemsWithCategoriesSelector(state);
// itemsWithCategoriesSelector(state);


/* recompose examples */
// import './recompose';
