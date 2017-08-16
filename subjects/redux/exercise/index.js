import '../util/polyfill'; // first import polyfills

// import tests
import './single-file';
import './growth/index';
import './logic/index';
import './logic2/index';

Error.stackTraceLimit = 3; // limit size of stack trace in chrome
mocha.run();
