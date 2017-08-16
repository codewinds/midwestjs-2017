/* eslint-disable */

var subjects = require('./util/get-subjects')();

// http://www.browsersync.io/docs/options/

var config = {
  // uses default browser or you can specify your own choice
  // browser: ['google chrome'],
  // browser: ['google chrome canary'],
  // browser: ['firefox'],
  ghostMode: false,
  port: 3005,
  // proxy: 'localhost:8005',
  reloadDelay: 500,
  reloadDebounce: 500,
  files: [
    'public/*.html',
    'public/*.json'
    // since we are using browser-sync-webpack-plugin
    // and webpack is now building js and css, it will trigger reload
    // for the following files
    // 'dist/main.js',
    // 'dist/style.min.css'
  ],
  server: {
    baseDir: './public',
    // setup routes for all subjects
    routes: subjects.reduce(function (accum, subject) {
      // /example1 -> ./subjects/example1/public
      // /example1 -> ./dist/example1
      accum['/' + subject] = './subjects/' + subject + '/public';
      accum['/' + subject + '/dist'] = './dist/' + subject;
      return accum;
    }, { // root routes
      '/dist': './dist',
      '/shared': './dist',
      '/react-router/dynamic/foo': './subjects/react-router/public/lecture.html',
      '/react-router/dynamic/bar': './subjects/react-router/public/lecture.html',
      '/react-router/dynamic/baz': './subjects/react-router/public/lecture.html',
      '/react-router/dynamic/baz/more': './subjects/react-router/public/lecture.html'
    })
  }
};

module.exports = config;
