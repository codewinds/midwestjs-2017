import { Observable } from 'rxjs';

document.querySelector('#appContainer').innerHTML =
  `<h2>rxjs-recon-ws</h2>
   see console and network devtools`;

const wsSubject = Observable.webSocket({
  url: 'ws://localhost:8010',
  // WebSocketCtor: WebSocket, // only for Node.js, import WebSocket from 'ws';
  resultSelector: x => x.data  // default is JSON.parse(x.data)
});

const reconWS$ = wsSubject
  .retryWhen(errors =>
    errors
    .do(err => console.error(err))
    .switchMap(err => Observable.timer(1000)));

wsSubject.next('foo'); // queue foo for sending
wsSubject.next('bar'); // queue bar for sending

// connect to websocket, send queued msgs, listen for responses
reconWS$.subscribe(
  x => console.log('received', x),
  err => console.error('error', err),
  () => console.log('done')
);

Observable.interval(1000)
          .do(() => wsSubject.next(`time: ${Date.now()}`))
          .subscribe();
