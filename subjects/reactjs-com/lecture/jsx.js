import '../util/polyfill'; // first import polyfills
import React from 'react';
import ReactDOM from 'react-dom';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');

/*
   JSX - syntactic sugar for React.createElement(comp, props, children)
 */

/*
   Without using JSX
 */
// ReactDOM.render(
//   React.createElement('div',
//                       { className: 'foo' },
//                       React.createElement('b', null, 'Hello')),
//   appContainerDiv
// );


/*
   JSX - simple
 */
// function Foo() {
//   return <div className='foo'>Hi everyone!</div>;
// }
// ReactDOM.render(<Foo />, appContainerDiv);


/*
   JSX - component objects and dot notation
 */
// const Components = {
//   Foo() { return <div>I am foo</div>; }
// };
// ReactDOM.render(<Components.Foo />, appContainerDiv);


/*
   JSX - props
 */
// function Foo({ greeting, name, time }) {
//   return (
//     <div>
//     <h1>{ greeting } { name }!!!</h1>
//     <p>The time is { time.toLocaleString() }</p>
//     </div>
//   );
// }
// const myName = 'Jeff';
// ReactDOM.render(
//   <Foo greeting='Hello' name={myName} time={new Date()} />,
//   appContainerDiv
// );


/*
   JSX - props default to true
 */
// function Foo({ enabled }) {
//   return <div>{ enabled ? 'Enabled' : 'Disabled' }</div>;
// }
// ReactDOM.render(<Foo />, appContainerDiv);
// setTimeout(() => {
//   ReactDOM.render(<Foo enabled />, appContainerDiv);
// }, 2000);


/*
   JSX - spread attributes
 */
// function Foo({ name, greeting }) {
//   return <div>{ greeting } { name }</div>;
// }
// const props = {
//   name: 'World',
//   greeting: 'Greetings'
// };
// ReactDOM.render(<Foo {...props} />, appContainerDiv);


/*
   JSX - children
 */
// function Foo({ children }) {
//   return (
//     <div>
//     <p>Header</p>
//     <p>{ children }</p>
//     <p>Footer</p>
//     </div>
//   );
// }
// ReactDOM.render(<Foo><b>Bar</b></Foo>, appContainerDiv);


/*
   JSX - functions as children
 */
// function Foo({ children }) {
//   return (
//     <div>{ children() }</div>
//   );
// }
// function catFn() {
//   return (
//     <b>Cats are fun</b>
//   );
// }
// ReactDOM.render(<Foo>{ catFn }</Foo>, appContainerDiv);


/*
   JSX - conditional rendering
 */
// function Foo({ show }) {
//   return (
//     <div>Foo { show && <b>Showing</b> }</div>
//   );
// }
// ReactDOM.render(<Foo />, appContainerDiv);
// setTimeout(() => {
//   ReactDOM.render(<Foo show />, appContainerDiv);
// }, 2000);


/*
   JSX - using raw HTML
 */
// function Foo({ htmlFn }) {
//   return (
//     <div dangerouslySetInnerHTML={{ __html: htmlFn() }} />
//   );
// }
// function htmlRender() {
//   return '<b>My HTML</b>';
// }
// ReactDOM.render(<Foo htmlFn={htmlRender} />, appContainerDiv);
