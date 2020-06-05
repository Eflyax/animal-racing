const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9000 })
const Player = require("./src/Player");
const ConsumerCreateLobby = require("./src/messageConsumer/ConsumerCreateLobby");

ROOMS = [];
PLAYERS = [];

var consumerCreateLobby = new ConsumerCreateLobby();

console.log('Server started');

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  var id = req.headers['sec-websocket-key'];

  PLAYERS[id] = (new Player('Eflyax', id, ws));

  ws.on('message', message => {
    var message = JSON.parse(message);
    var consumerName = 'consumer' + message.action;
    consumer = eval(consumerName);
    consumer.consume(id, ws, message);
  });

  ws.on('close', function () {
    delete PLAYERS[id];
    delete ROOMS[id]; // todo - odpojit ostatní hráče z roomky

    console.log(PLAYERS);
    console.log(ROOMS);
  });

})