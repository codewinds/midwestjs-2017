import '../util/polyfill'; // first import polyfills
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {find, set, unset, toPairs} from 'lodash/fp';
import { compose, defaultProps, mapProps, withProps,
  withPropsOnChange, renameProp, renameProps,
  withState, withHandlers, flattenProp, withReducer,
  branch, renderComponent, renderNothing, shouldUpdate, pure,
  onlyUpdateForKeys, onlyUpdateForPropTypes, withContext,
  getContext, lifecycle, setPropTypes, componentFromProp,
  hoistStatics } from 'recompose';
import { Simulate } from 'react-addons-test-utils';

// locate a div in our html where we want to render
const div = document.querySelector('#appContainer');

const EchoProps = props => {
  console.log('props', props);
  return (
    <ul>
    { toPairs(props).map(([key, value]) =>
      <li key={key}>{key}: {value}</li> ) }
    </ul>
  );
};

/* defaultProps */
// const Comp = defaultProps({
//   greeting: 'Hello'
// })(EchoProps);
// ReactDOM.render(<Comp first="John" last="Smith" />, div);
// ReactDOM.render(<Comp first="Jenny" last="Great" greeting="Hi" />, div);


/* mapProps */
// const Comp = mapProps(props => ({
//   firstName: props.first,
//   lastName: props.last
// }))(EchoProps);
// ReactDOM.render(<Comp first="John" last="Smith" />, div);


/* withProps fn */
// const Comp = withProps(props => ({
//   fullName: `${props.first} ${props.last}`,
//   mode: 1
// }))(EchoProps);
// ReactDOM.render(<Comp first="John" last="Smith" />, div);


/* withProps obj */
// const Comp = withProps({
//   role: 'user'
// })(EchoProps);
// ReactDOM.render(<Comp first="John" last="Smith" />, div);


/* withPropsOnChange arr */
// const Comp = withPropsOnChange(
//   ['first', 'last'],
//   props => {
//     console.log('recalculating fullName');
//     return {
//       fullName: `${props.first} ${props.last}`
//     };
//   }
// )(EchoProps);
// ReactDOM.render(<Comp first="John" last="Smith" />, div);
// ReactDOM.render(<Comp first="John" last="Smith" />, div);
// ReactDOM.render(<Comp first="Jenny" last="Smith" />, div);


/* withPropsOnChange fn */
// const Comp = withPropsOnChange(
//   (props, nextProps) =>
//     props.first !== nextProps.first || props.last !== nextProps.last,
//   props => {
//     console.log('recalculating fullName');
//     return {
//       fullName: `${props.first} ${props.last}`
//     };
//   }
// )(EchoProps);
// ReactDOM.render(<Comp first="Bill" last="Wonder" />, div);
// ReactDOM.render(<Comp first="Bill" last="Wonder" />, div);
// ReactDOM.render(<Comp first="Mary" last="Wonder" />, div);


/* renameProp */
// const Comp = renameProp('first', 'firstName')(EchoProps);
// ReactDOM.render(<Comp first="Carrie" age={21} />, div);


/* renameProps */
// const Comp = renameProps({
//   first: 'firstName',
//   last: 'lastName'
// })(EchoProps);
// ReactDOM.render(<Comp first="Brenda" last="Blank" age={25} />, div);


/* withState / withHandlers counter */
// const ButtonCount = ({ count, incr, decr }) => {
//   console.log('rendering count:', count);
//   return (
//     <div>
//     Count: {count}
//     <button className="incr" onClick={incr}>Inc</button>
//     <button className="decr" onClick={decr}>Dec</button>
//     </div>
//   );
// };
//
// const Comp = compose(
//   withState('count', 'updateCount', 0),
//   withHandlers({
//     incr: ({ updateCount }) => ev => updateCount(x => x + 1),
//     decr: ({ updateCount }) => ev => updateCount(x => x - 1)
//   })
// )(ButtonCount);
// ReactDOM.render(<Comp />, div, () => {
//   Simulate.click(div.querySelector('.incr'));
//   Simulate.click(div.querySelector('.incr'));
//   Simulate.click(div.querySelector('.decr'));
//
// });


/* withState / withHandlers form */
// const Form1 = ({ values, onChange, onSubmit }) => {
//   console.log('rendering values:', values);
//   return (
//     <form onSubmit={onSubmit}>
//     <input name="first" value={values.first} onChange={onChange} />
//     <input name="last" value={values.last} onChange={onChange} />
//     <button>Submit</button>
//     </form>
//   );
// };
//
// const Comp = compose(
//   withState('values', 'updateValues', { first: '', last: ''}),
//   withHandlers({
//     onChange: ({ updateValues }) => ev => {
//       const {name, value} = ev.target;
//       updateValues(x => {
//         x[name] = value;
//         return x;
//       });
//     },
//     onSubmit: ({ values, updateValues }) => ev => {
//       ev.preventDefault();
//       console.log('submit', values);
//       updateValues(x => ({ first: '', last: '' }));
//     }
//   })
// )(Form1);
// ReactDOM.render(<Comp />, div, () => {
//   Simulate.change(div.querySelector('input[name="first"]'),
//     { target: { name: 'first', value: 'Jane' }});
//   Simulate.change(div.querySelector('input[name="last"]'),
//     { target: { name: 'last', value: 'Smith' }});
//   div.querySelector('button').click();
//
// });


/* flattenProp */
// const Comp = flattenProp('values')(EchoProps);
// const values = { first: 'Henry', last: 'Williams' };
// ReactDOM.render(<Comp values={values} />, div);


/* withReducer */
// const Form1 = ({ values, dispatch }) => {
//   console.log('rendering values:', values);
//   const onChange = ev => {
//     dispatch({ type: 'FIELD_CHANGE',
//       name: ev.target.name,
//       value: ev.target.value });
//   };
//   const onSubmit = ev => {
//     ev.preventDefault();
//     dispatch({ type: 'FORM_SUBMIT' });
//   };
//
//   return (
//     <form onSubmit={onSubmit}>
//     <input name="first" value={values.first} onChange={onChange} />
//     <input name="last" value={values.last} onChange={onChange} />
//     <button>Submit</button>
//     </form>
//   );
// };
//
// const reducer = (state, action) => {
//   switch(action.type) {
//   case 'FIELD_CHANGE' :
//     return {
//       ...state,
//       [action.name]: action.value
//     };
//   case 'FORM_SUBMIT' :
//     console.log('submit values', state);
//     return {
//       ...state,
//       first: '',
//       last: ''
//     };
//   default:
//     return state;
//   };
// };
//
// const Comp = withReducer(
//   'values',
//   'dispatch',
//   reducer,
//   { first: '', last: '' }
// )(Form1);
//
// ReactDOM.render(<Comp />, div, () => {
//   Simulate.change(div.querySelector('input[name="first"]'),
//     { target: { name: 'first', value: 'Laura' }});
//   Simulate.change(div.querySelector('input[name="last"]'),
//     { target: { name: 'last', value: 'Bell' }});
//   div.querySelector('button').click();
//
// });


/* branch / renderComponent */
// const Loading = props => <div>Loading...</div>;
// const Loaded = ({ content }) => <div>Loaded { content }</div>;
//
// const Comp = branch(
//   props => !props.content,
//   renderComponent(Loading)
// )(Loaded);
//
// ReactDOM.render(<Comp />, div, () => {
//   console.log(div.innerHTML);
//   ReactDOM.render(<Comp content="hello" />, div, () => {
//     console.log(div.innerHTML);
//
//   });
// });



/* branch / renderNothing */
// const Loaded = ({ content }) => <div>Loaded { content }</div>;
//
// const Comp = branch(
//   props => !props.content,
//   renderNothing
// )(Loaded);
//
// ReactDOM.render(<Comp />, div, () => {
//   console.log(div.innerHTML);
//   ReactDOM.render(<Comp content="hello" />, div, () => {
//     console.log(div.innerHTML);
//
//   });
// });



/* pure */
// const Comp = pure(EchoProps);
// ReactDOM.render(<Comp foo={1} />, div);
// ReactDOM.render(<Comp foo={1} />, div);
// ReactDOM.render(<Comp foo={2} />, div);


/* shouldUpate */
// const Comp = shouldUpdate(
//   (props, nextProps) => props.message !== nextProps.message
// )(EchoProps);
// ReactDOM.render(<Comp mode={1} message="hello" />, div);
// ReactDOM.render(<Comp mode={2} message="hello" />, div);
// ReactDOM.render(<Comp mode={3} message="hi world" />, div);


/* onlyUpdateForKeys */
// const Comp = onlyUpdateForKeys(
//   ['message']
// )(EchoProps);
// ReactDOM.render(<Comp mode={1} message="hello" />, div);
// ReactDOM.render(<Comp mode={2} message="hello" />, div);
// ReactDOM.render(<Comp mode={3} message="hi world" />, div);


/* onlyUpdateForPropTypes / setPropTypes */
// const Article = ({ title, content, foo }) => {
//   console.log('article title:%s content:%s foo:%s', title, content, foo);
//   return <div>{ title } { content } { foo }</div>;
// };
// const Comp = compose(
//   onlyUpdateForPropTypes,
//   setPropTypes({
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired
//   })
// )(Article);
// ReactDOM.render(<Comp title="My title" content="My content" />, div, () => {
//   ReactDOM.render(<Comp foo={1} title="My title" content="My content" />, div, () => {
//     ReactDOM.render(<Comp foo={1} title="My title" content="My content2" />, div, () => {
//
//     });
//   });
// });


/* withContext / getContext */
// const bar = ev => console.log('clicked');
//
// const Foo = ({ bar }) => <button onClick={bar}>Click</button>;
// const CFoo = getContext({
//   bar: PropTypes.func
// })(Foo);
//
// const App = props => <div><CFoo /></div>;
// const CApp = withContext(
//   {
//     bar: PropTypes.func
//   },
//   props => ({
//     bar
//   })
// )(App);
//
// ReactDOM.render(<CApp />, div, () => {
//   Simulate.click(div.querySelector('button'));
//   Simulate.click(div.querySelector('button'));
// });


/* lifecycle */
// const Comp = lifecycle({
//   componentDidMount() {
//     // could fetch here
//     this.setState({ content: 'The quick brown fox' });
//   }
// })(EchoProps);
// ReactDOM.render(<Comp />, div);


/* setPropTypes */
// const ABC = ({ foo, bar }) => <div>{ foo } { bar }</div>;
// const Comp = setPropTypes({
//   foo: PropTypes.string.isRequired,
//   bar: PropTypes.number
// })(ABC);
// console.log('ABC', ABC.propTypes);
// console.log('Comp', Comp.propTypes);
// console.log('equal?', ABC === Comp);


/* componentFromProp */
// const Comp = defaultProps({
//   component: 'button'
// })(componentFromProp('component'));
// ReactDOM.render(<Comp className="b1" />, div, () => {
//   console.log(div.innerHTML);
//   ReactDOM.render(<Comp component="a" className="b2" />, div, () => {
//     console.log(div.innerHTML);
//
//   });
// });


/* hoistStatics */
// const ABC = ({ foo, className }) =>
//   <div className={className}>{ foo }</div>;
// ABC.fetchURL = 'https://codewinds.com';
//
// const Comp = compose(
//   hoistStatics(defaultProps({
//     className: 'normal'
//   })),
//   hoistStatics(withProps({
//     foo: 1
//   }))
// )(ABC);
// console.log(Comp.fetchURL);
// ReactDOM.render(<Comp />, div, () => {
//   console.log(div.innerHTML);
//   ReactDOM.render(<Comp className="bold" />, div, () => {
//     console.log(div.innerHTML);
//   });
// });


/* branch / renderComponent / lifecycle */
// const Loading = props => <div>Loading...</div>;
// const MainContent = ({ content }) => <div>Loaded { content }</div>;
//
// const DynamicContent = compose(
//   lifecycle({
//     componentDidMount() {
//       /* simulate a fetch here */
//       setTimeout(() => {
//         this.setState({ content: 'The quick brown fox' });
//       }, 2000);
//     }
//   }),
//   branch(props => !props.content, renderComponent(Loading))
// )(MainContent);
//
// ReactDOM.render(<DynamicContent />, div, () => {
//   console.log(div.innerHTML);
//   setTimeout(() => {
//     console.log(div.innerHTML);
//   }, 200);
// });
