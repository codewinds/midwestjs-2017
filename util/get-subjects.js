/* eslint-disable */

/*
  Find all of the subjects in the subjects directory
  Return array of subject names
*/

var fs = require('fs');
var Path = require('path');

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

var subjectsPath = Path.resolve(__dirname, '..', 'subjects');

function getSubjects() {
  var subjects = fs.readdirSync(subjectsPath)
      .filter(function (dir) {
        return isDirectory(Path.resolve(subjectsPath, dir));
      });
  return subjects;
}

module.exports = getSubjects;
