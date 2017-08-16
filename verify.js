/* eslint-disable */

var semver = require('./util/semver');
var execSync = require('child_process').execSync;

// npm version that works with shrinkpack
// https://github.com/JamieMason/shrinkpack#installation
// https://github.com/npm/npm/pull/13214
var WANTED_NPM_VERSION = '^2.0.0 || >=3.0.0 <=3.8.7 || >=3.10.4';

var npmVersion = execSync('npm --version').toString().trim();

if (!semver.satisfies(npmVersion, WANTED_NPM_VERSION)) {
  process.stderr.write(
    'Your version of npm ' + npmVersion + ' is outdated\n\n' +
    'You may update your version of npm using the command\n' +
    '  npm update -g npm\n\n' +
    'Then you may retry your npm install\n'
  );
  process.exitCode = 20; // anything but 0. 1-13, >127 used by node
}
