import '../util/polyfill'; // first import polyfills
import React from 'react';
import ReactDOM from 'react-dom';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');

// class Foo extends React.Component {
//   render() {
//     /* returning false or null will render nothing */
//     return <div>Hello World</div>;
//   }
// }
// ReactDOM.render(<Foo />, appContainerDiv);

/* using props */
// class Foo extends React.Component {
//   render() {
//     return <div>Hello {this.props.name}</div>;
//   }
// }
// const myName = 'Bob';
// ReactDOM.render(<Foo name={myName} />, appContainerDiv);


/* adding state */
// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       time: new Date()
//     };
//   }
//
//   render() {
//     return (
//       <div>Time: { this.state.time.toLocaleString() }</div>
//     );
//   }
// }
// ReactDOM.render(<Foo />, appContainerDiv);


/* adding a ref to custom component and updating state */
// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       widgets: 10,
//       time: new Date()
//     };
//   }
//
//   render() {
//     return (
//       <div>
//       <h4>Time: { this.state.time.toLocaleString() }</h4>
//       <p>Widgets: { this.state.widgets }</p>
//       </div>
//     );
//   }
// }
// let fooComp; /* will contain a reference to Foo component */
// ReactDOM.render(<Foo ref={ x => { fooComp = x; } } />,
//                 appContainerDiv,
//                 () => { /* done rendering */
//                   console.log(fooComp);
//                   setInterval(() => {
//                     fooComp.setState({
//                       time: new Date()
//                     });
//                   }, 1000);
//                 });

/* setState is async, optional cb when done rendering updates */
// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       widgets: 10,
//       time: new Date()
//     };
//   }
//
//   render() {
//     return (
//       <div>
//       <h4>Time: { this.state.time.toLocaleString() }</h4>
//       <p>Widgets: { this.state.widgets }</p>
//       </div>
//     );
//   }
// }
// let fooComp;  /* will contain a reference to Foo component */
// ReactDOM.render(<Foo ref={ x => { fooComp = x; } } />,
//                 appContainerDiv,
//                 () => {  /* done rendering */
//                   console.log(fooComp);
//                   setInterval(() => {
//                     fooComp.setState({
//                       time: new Date()
//                     }, renderFinished);
//                   }, 1000);
//                 });
// function renderFinished() {
//   console.log('renderFinished', (new Date()).toLocaleString());
// }


/* modifying state with an update function */
// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       clicks: 0,
//       other: 'hello'
//     };
//   }
//
//   render() {
//     const clickHandler = () => {
//       this.setState( /* pass object or function */
//         (prevState, props) => ({
//           clicks: prevState.clicks + 1
//         })
//       );
//     };
//
//     return (
//       <div onClick={clickHandler} >
//       <p>Clicks: { this.state.clicks }</p>
//       <p>{ this.state.other }</p>
//       </div>
//     );
//   }
// }
// ReactDOM.render(<Foo />,
//                 appContainerDiv);


/* adding a ref to a dom element */
// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: 'Jessica'
//     };
//   }
//
//   render() {
//     const submitHandler = () => {
//       this.setState({
//         name: this.nameInputElem.value /* using ref to get value */
//       });
//     };
//
//     return (
//       <div>
//       <input ref={ domElem => { this.nameInputElem = domElem; }} />
//       <button onClick={submitHandler}>Change</button>
//       <p>Name: { this.state.name }</p>
//       </div>
//     );
//   }
// }
// ReactDOM.render(<Foo />,
//                 appContainerDiv);
