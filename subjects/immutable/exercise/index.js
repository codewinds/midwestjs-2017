import '../util/polyfill'; // first import polyfills
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import deepFreeze from 'deep-freeze';
import Imm from 'immutable';
import { merge, mergeIn, set, setIn, update, updateIn } from 'timm';
import Up from 'updeep';
import fp from 'lodash/fp';

// import tests
import './plain';
import './im-map-list';
import './im-record-list';
import './timm';
import './updeep';
import './lodash-fp';
import './redux-im';

Error.stackTraceLimit = 3; // limit size of stack trace in chrome
mocha.run();
