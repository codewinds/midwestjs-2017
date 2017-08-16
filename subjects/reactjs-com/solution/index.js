import '../util/polyfill'; // first import polyfills

// load the mocha tests
// import './state';
// import './lifecycle';
// import './jsx';
import './forms';

Error.stackTraceLimit = 3; // limit size of stack trace in chrome
mocha.run();
