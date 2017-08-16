import '../util/polyfill'; // first import polyfills

// import the tests
import './single-file';
import './split-file';
import './reselect';
import './recompose';

Error.stackTraceLimit = 3; // limit size of stack trace in chrome
mocha.run();
