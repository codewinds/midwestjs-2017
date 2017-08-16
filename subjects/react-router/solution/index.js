import '../util/polyfill'; // first import polyfills

Error.stackTraceLimit = 3; // limit size of stack trace in chrome

// import tests
// import './basic';
import './fetching';

mocha.run();
