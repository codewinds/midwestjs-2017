import '../util/polyfill'; // first import polyfills
import React from 'react';
import ReactDOM from 'react-dom';

// locate a div in our html where we want to render
const appContainerDiv = document.querySelector('#appContainer');

/*
   componentWillMount - only hook called in server rendering
   https://github.com/reactjs/react-redux/issues/129#issuecomment-148420509
   Could be used for dispatching actions however you will likely want
   to have everything in advance if rendering on the server, so it would
   better to put fetching and actions in the client-only
   componentDidMount

   If you are synchronously setting state just do it in the constructor,
   otherwise client-only fetching is better to put in componentDidMount.

   It is mainly a left over from pre-ES6 classes when using createClass,
   it would be used to do things you can now do in the constructor like
   setting state based on props.
 */
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'nobody'
    };
  }

  componentWillMount() {
    /* simulating async update, not good for server rendering though */
    setTimeout(() => {
      this.setState({ name: 'World' });
    }, 1000);
  }

  render() {
    return <div>Hello {this.state.name}</div>;
  }
}
ReactDOM.render(<Foo />, appContainerDiv);


/*
   componentDidMount - after component mounted, client-only
   Can perform client-side fetch of data or work with DOM nodes
 */
// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: 'nobody'
//     };
//     this.domElem = null; /* will get ref to element */
//   }
//
//   componentDidMount() {
//     /* access DOM nodes */
//     console.log('domElem.textContent', this.domElem.textContent);
//     /* simulate fetching data from server, only runs on client */
//     setTimeout(() => {
//       this.setState({ name: 'World' });
//     }, 1000);
//   }
//
//   render() {
//     return (
//       <div ref={domElem => { this.domElem = domElem; }} >
//       Hello {this.state.name}
//       </div>
//     );
//   }
// }
// ReactDOM.render(<Foo />, appContainerDiv);


/*
   componentWillReceiveProps(nextProps) - before updating props
   Not called on initial mounting but if props are being updated,
   you might use this to update state that is based on props
 */
// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       upperName: this.props.name.toUpperCase()
//     };
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.name !== this.props.name) {
//       this.setState({
//         upperName: nextProps.name.toUpperCase()
//       });
//     }
//   }
//
//   render() {
//     return (
//       <div>Hello {this.state.upperName}</div>
//     );
//   }
// }
// ReactDOM.render(<Foo name="John" />, appContainerDiv);
// setTimeout(() => {
//   ReactDOM.render(<Foo name="Wendy" />, appContainerDiv);
// }, 1000);


/*
   shouldComponentUpdate should the component update return true | false
 */
// class Foo extends React.Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.name === 'Catherine') {
//       console.log('update silenced', nextProps.name);
//       return false;
//     }
//     return true;
//   }
//
//   render() {
//     return (
//       <div>Hello {this.props.name}</div>
//     );
//   }
// }
// ReactDOM.render(<Foo name="Bill" />, appContainerDiv);
// setTimeout(() => {
//   ReactDOM.render(<Foo name="Catherine" />, appContainerDiv);
// }, 1000);
// setTimeout(() => {
//   ReactDOM.render(<Foo name="Darlene" />, appContainerDiv);
// }, 2000);


/*
   componentWillUpdate just before update occurs, not initial render
   Cannot call this.setState here, use componentWillReceiveProps instead
   Some common uses calculate variable based on state changes,
   dispatching actions or starting animations
 */
// class Foo extends React.Component {
//   componentWillUpdate(nextProps, nextState) {
//     console.log('next name:', nextProps.name);
//     console.log('start animation here based on props/state');
//     console.log('could dispatch an action');
//   }
//
//   render() {
//     return (
//       <div>Hello {this.props.name}</div>
//     );
//   }
// }
// ReactDOM.render(<Foo name="Ellen" />, appContainerDiv);
// setTimeout(() => {
//   ReactDOM.render(<Foo name="Frank" />, appContainerDiv);
// }, 1000);


/*
   componentDidUpdate called after update occurs, not initial render
   Opportunity to operate on the DOM after an update.
   A decent place to make client-side network requests if you check
   the props first. Be careful not to create an infinite loop
 */
// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       message: ''
//     };
//     this.domElem = null;  /* will get ref to element */
//   }
//
//   componentDidUpdate(nextProps, nextState) {
//     /* access DOM nodes */
//     console.log('domElem.textContent', this.domElem.textContent);
//     /* simulate fetching data from server, only runs on client */
//     if (nextProps.name === 'Hilda') {
//       setTimeout(() => {
//         this.setState({ message: 'The answer is 42' });
//       }, 1000);
//     }
//   }
//
//   render() {
//     console.log('rendering', this.props.name);
//     return (
//       <div ref={domElem => { this.domElem = domElem; }} >
//       Hello {this.props.name}<br/>
//       { this.state.message }
//       </div>
//     );
//   }
// }
// ReactDOM.render(<Foo name="Gary" />, appContainerDiv);
// setTimeout(() => {
//   ReactDOM.render(<Foo name="Hilda" />, appContainerDiv);
// }, 1000);


/*
   componentWillUnmount - cleanup timers, cancel network requests or
   any DOM elements created from componentDidMount
 */
// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       time: ''
//     };
//     this.timer = null;
//   }
//
//   componentDidMount() {
//     console.log('mounted, starting timer');
//     this.timer = setInterval(() => {
//       console.log('interval fired');
//       this.setState({
//         time: (new Date()).toLocaleString()
//       });
//     }, 1000);
//   }
//
//   componentWillUnmount() {
//     console.log('cleaning up');
//     clearInterval(this.timer);
//     this.timer = null;
//   }
//
//   render() {
//     console.log('rendering', this.props.name);
//     return (
//       <div>Time: { this.state.time }</div>
//     );
//   }
// }
// ReactDOM.render(<Foo />, appContainerDiv);
// setTimeout(() => {
//   ReactDOM.render(<div>Hi</div>, appContainerDiv);
// }, 4000);
