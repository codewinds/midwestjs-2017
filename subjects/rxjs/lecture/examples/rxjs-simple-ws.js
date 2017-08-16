import { Observable } from 'rxjs';

document.querySelector('#appContainer').innerHTML =
  `<h2>rxjs-simple-ws</h2>
   see console and network devtools`;

const wsSubject = Observable.webSocket({
  url: 'ws://localhost:8010',
  // WebSocketCtor: WebSocket, // only for Node.js, import WebSocket from 'ws';
  resultSelector: x => x.data  // default is JSON.parse(x.data)
});


wsSubject.next('foo'); // queue foo for sending
wsSubject.next('bar'); // queue bar for sending

// connect to websocket, send queued msgs, listen for responses
wsSubject.subscribe(
  x => console.log('received', x),
  err => console.error('error', err),
  () => console.log('done')
);

Observable.interval(1000)
          .take(5)
          .do(() => wsSubject.next(`time: ${Date.now()}`))
          .subscribe();

Observable.timer(10000)
          .do(() => wsSubject.complete())
          .subscribe();
