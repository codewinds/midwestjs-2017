const FS = require('fs');
const getSubjects = require('./get-subjects');
const Path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const DOM = React.DOM;

const courseTitle = 'React Family Workshop';

const subjectsDir = Path.resolve(__dirname, '..', 'subjects');

// subjects object key: value (title)
// create object with keys and values of subject dir names for dirs
// we could instead create subjects manually controlling order and titles
const subjects = getSubjects().reduce((acc, s) => {
  acc[s] = s; // eslint-disable-line no-param-reassign
  return acc;
}, {});

function createSubjectHtml(subject, item) {
  return ReactDOMServer.renderToStaticMarkup(
    DOM.html({},
             DOM.body({},
                      DOM.h1({}, `${subject} ${item}`),
                      DOM.div({ id: 'appContainer' }),
                      DOM.div({ id: 'mocha' }),
                      DOM.link({ rel: 'stylesheet', href: '/dist/style.min.css' }),
                      DOM.script({ src: '/shared/common.js' }),
                      DOM.script({ src: '/dist/mocha-setup.js' }),
                      DOM.script({ src: `/${subject}/dist/${item}.js` })
      )
    )
  );
}

function writeSubjectHtml(subject) {
  ['lecture', 'exercise', 'solution'].forEach(x => {
    const path = Path.resolve(subjectsDir, subject, `public/${x}.html`);
    FS.writeFileSync(path, createSubjectHtml(subject, x));
  });
}

function createMainIndexHtml() {
  return ReactDOMServer.renderToStaticMarkup(
    DOM.html({},
      DOM.body({},
        DOM.div({ id: 'main' },
          DOM.h1({}, courseTitle),
          DOM.table({},
            DOM.tbody({},
              Object.keys(subjects).map((subject, idx) =>
                DOM.tr({ className: (idx % 2) ? 'odd' : 'even', key: idx },
                  DOM.td({ className: 'idx' }, `${idx + 1}.`),
                  DOM.td({ className: 'lecture' },
                    DOM.a({ href: `/${subject}/lecture.html` }, subjects[subject])),
                  DOM.td({ className: 'exercise' },
                    DOM.a({ href: `/${subject}/exercise.html` }, 'exercise')),
                  DOM.td({ className: 'solution' },
                    DOM.a({ href: `/${subject}/solution.html` }, 'solution'))
                )
              )
            )
          )
        ),
        DOM.link({ rel: 'stylesheet', href: '/dist/style.min.css' })
      )
    )
  );
}

function writeMainIndexHtml() {
  const path = Path.resolve(__dirname, '../public/index.html');
  FS.writeFileSync(path, createMainIndexHtml());
}

Object.keys(subjects).forEach(subject => {
  writeSubjectHtml(subject);
});

writeMainIndexHtml();
