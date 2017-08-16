import '../util/polyfill'; // first import polyfills
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');

ReactDOM.render(
  <div>
  <div>State management and coordination</div>
  <ul>
  <li>Manages state in an immutable fashion</li>
  <li>Connects state with container components</li>
  <li>Encourages good archictecture</li>
  <li>Dev tools and middleware to extend</li>
  </ul>
  </div>,
  appContainerDiv
);

// ReactDOM.render(<h1>Redux</h1>, appContainerDiv);

/* array reduce */

// const arr = ['a', 'b', 'c'];
// const obj = arr.reduce((acc, x) => {
//   acc[x] = true;
//   return acc;
// }, {});
//
// console.log('obj', obj);



/* action reducer */

// const initialState = {
//   cartItems: []
// };
//
// function reducer(state = initialState,
//                  action = {}) {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return {
//         ...state,
//         cartItems: state.cartItems.concat(
//           action.payload)
//       };
//     default:
//       return state;
//   }
// }
//
// const state0 = reducer();
// console.log('state0', state0);
// const state1 = reducer(state0,
//                        { type: 'ADD_TO_CART',
//                          payload: { id: 101 }
//                        });
// console.log('state1', state1);



/* redux store */

// const initialState = {
//   cartItems: []
// };
//
// function reducer(state = initialState,
//                  action = {}) {
//   switch (action.type) {
//   case 'ADD_TO_CART':
//     return {
//       ...state,
//       cartItems: state.cartItems.concat(
//         action.payload)
//     };
//   default:
//     return state;
//   }
// }
//
// const store = createStore(reducer);
//
// store.subscribe(() => {
//   console.log('state', store.getState());
// });
//
// store.dispatch({ type: 'ADD_TO_CART',
//                  payload: { id: 101 }
//                });
// store.dispatch({ type: 'ADD_TO_CART',
//                  payload: { id: 201 }
//                });



/* redux simple render and dev tools
   https://github.com/zalmoxisus/redux-devtools-extension */

// const initialState = {
//   cartItems: []
// };
//
// function reducer(state = initialState,
//                  action = {}) {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return {
//         ...state,
//         cartItems: state.cartItems.concat(
//           action.payload)
//       };
//     default:
//       return state;
//   }
// }
//
// const enhancer = (window.devToolsExtension) ?
//       window.devToolsExtension() :
//       f => f;
// const store = createStore(reducer, undefined, enhancer);
//
// store.subscribe(() => {
//   const state = store.getState();
//   console.log('state', state);
//   ReactDOM.render(<App cartItems={ state.cartItems} />,
//                   appContainerDiv);
// });
//
//
// function App({ cartItems }) {
//   return (
//       <div>
//         <h1>Cart</h1>
//         <ul>
//           { cartItems.map(item => (
//             <li key={item.id}>{ item.name }</li> )) }
//         </ul>
//       </div>
//   );
// }
//
// store.dispatch({ type: 'ADD_TO_CART',
//                  payload: { id: 101, name: 'Foo' }
//                });
//
// setTimeout(() => {
//   store.dispatch({ type: 'ADD_TO_CART',
//                    payload: { id: 201, name: 'Bar' }
//                  });
// }, 2000);



/* react-redux */

// import { connect, Provider } from 'react-redux';
//
// const initialState = {
//   cartItems: []
// };
//
// function reducer(state = initialState,
//                  action = {}) {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return {
//         ...state,
//         cartItems: state.cartItems.concat(
//           action.payload)
//       };
//     case 'CLEAR_CART':
//       return {
//         ...state,
//         cartItems: []
//       };
//     default:
//       return state;
//   }
// }
//
// const enhancer = (window.devToolsExtension) ?
//                  window.devToolsExtension() :
//                  f => f;
// const store = createStore(reducer, undefined, enhancer);
//
// const actions = {
//   clearCart(ev) {
//     return { type: 'CLEAR_CART' };
//   }
// };
//
// function Cart({ cartItems, clearCart }) {
//   return (
//     <div>
//     <h1>Cart</h1>
//     <ul>
//     { cartItems.map(item => (
//       <li key={item.id}>{ item.name }</li> )) }
//     </ul>
//     <button onClick={ clearCart }>Clear cart</button>
//     </div>
//   );
// }
//
// const CCart = connect(
//   state => ({ /* mapStateToProps */
//     cartItems: state.cartItems
//   }),
//   {  /* mapDispatchToProps */
//     clearCart: actions.clearCart
//   }
// )(Cart);
//
// function App() {
//   return (
//     <div>
//       <CCart />
//     </div>
//   );
// }
//
// ReactDOM.render(
//   <Provider store={store} >
//   <App />
//   </Provider>,
//   appContainerDiv
// );
//
//
// store.dispatch({ type: 'ADD_TO_CART',
//                  payload: { id: 101, name: 'Foo' }
// });
//
// setTimeout(() => {
//   store.dispatch({ type: 'ADD_TO_CART',
//                    payload: { id: 201, name: 'Bar' }
//   });
// }, 2000);


/* combineReducers and selectors */

// import { combineReducers } from 'redux';
//
// const cartKey = 'cart'; /* for selectors and combine */
// const cartSel = {
//   cartItems: state => state[cartKey].cartItems
// };
// const cartInitialState = {
//   cartItems: []
// };
// function cartReducer(state = cartInitialState,
//                      action = {}) {
//   switch (action.type) {
//     case 'cart/ADD_TO_CART':
//       return {
//         ...state,
//         cartItems: state.cartItems.concat(
//           action.payload)
//       };
//     case 'cart/CLEAR_CART':
//       return {
//         ...state,
//         cartItems: []
//       };
//     default:
//       return state;
//   }
// }
//
// const fooKey = 'foo'; /* for selectors and combine */
// const fooSel = {
//   count: state => state[fooKey].count
// };
// const fooInitialState = {
//   count: 0
// };
// function fooReducer(state = fooInitialState, action = {}) {
//   switch (action.type) {
//     case 'foo/INCREMENT':
//       return {
//         ...state,
//         count: state.count + 1
//       };
//     default:
//       return state;
//   }
// }
//
// const rootReducer = combineReducers({
//   [cartKey]: cartReducer,
//   [fooKey]: fooReducer
// });
//
//
// const state0 = rootReducer();
// console.log('state0', state0);
// console.log('cartItems', cartSel.cartItems(state0));
// console.log('fooCount', fooSel.count(state0));




/* p2 combineReducers and selectors */


// import { connect, Provider } from 'react-redux';
//
// const enhancer = (window.devToolsExtension) ?
//                  window.devToolsExtension() :
//                  f => f;
// const store = createStore(rootReducer, undefined, enhancer);
//
// const cartActions = {
//   clearCart(ev) {
//     return { type: 'cart/CLEAR_CART' };
//   }
// };
//
// function Cart({ cartItems, clearCart }) {
//   return (
//     <div>
//     <h2>Cart</h2>
//     <ul>
//     { cartItems.map(item => (
//       <li key={item.id}>{ item.name }</li> )) }
//     </ul>
//     <button onClick={ clearCart }>Clear cart</button>
//     </div>
//   );
// }
//
// const CCart = connect(
//   state => ({ /* mapStateToProps */
//     cartItems: cartSel.cartItems(state)
//   }),
//   { /* mapDispatchToProps */
//     clearCart: cartActions.clearCart
//   }
// )(Cart);
//
//
// function Foo({ count }) {
//   return (
//     <div>
//     <h2>Foo</h2>
//     <div>Count: { count }</div>
//     </div>
//   );
// }
//
// const CFoo = connect(
//   state => ({ /* mapStateToProps */
//     count: fooSel.count(state)
//   })
// )(Foo);
//
//
// function App() {
//   return (
//     <div>
//     <CCart />
//     <CFoo />
//     </div>
//   );
// }
//
// ReactDOM.render(
//   <Provider store={store} >
//   <App />
//   </Provider>,
//   appContainerDiv
// );
//
// store.dispatch({ type: 'foo/INCREMENT' });
//
// store.dispatch({ type: 'cart/ADD_TO_CART',
//                  payload: { id: 101, name: 'Foo' }
// });
//
// setTimeout(() => {
//   store.dispatch({ type: 'cart/ADD_TO_CART',
//                    payload: { id: 201, name: 'Bar' }
//   });
// }, 2000);




/* async fetch w/action creators */

// import './examples/async-fetch-ac';



/* async fetch w/thunk */

// import './examples/async-fetch-thunk';



/* async fetch custom middleware */

// import './examples/async-fetch-mw';



/* async search redux-logic */

// import './examples/async-search-logic';


/* async search redux-logic using processOptions */

// import './examples/async-search-logic-options';
