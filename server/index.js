const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9000 })
const Room = require("./src/Room");
const RoomManager = require("./src/RoomManager");
const Player = require("./src/Player");

ROOMS = [];

ROOMS.push(new Room('pes'));
ROOMS.push(new Room('kocka'));
// console.log(ROOMS);
var roomManager = new RoomManager();
var founded = roomManager.findOneBy('code', 'kokot');
console.log(founded);
return 0;


PLAYERS = [];

console.log('Server started');

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  // var id = ws._socket._handle.fd;
  var id = req.headers['sec-websocket-key'];

  PLAYERS[id] = (new Player('Eflyax', id, ws));

  console.log(PLAYERS);

  ws.on('message', message => {
    var message = JSON.parse(message);

    switch (message.action) {
      case 'CREATE_LOBBY':

        ROOMS.push(new Room('pes'));
        ROOMS.push(new Room('chleba'));

        console.log(ROOMS);

        var founded = RoomManager.findOneBy('code', 'pes');

        console.log(founded);

        ws.send(JSON.stringify({ action: 'CREATE_LOBBY', 'error': null }));

        // if (message.gameCode == '1111') { // obsazeno
        //   ws.send(JSON.stringify({ action: 'CREATE_LOBBY', 'error': 'roomAlreadyExists' }));
        // } else { // volno
        //   ws.send(JSON.stringify({ action: 'CREATE_LOBBY', 'error': null }));
        // }
        break;
      default:
        console.log('neznámá akce');
        console.log(message);
        console.log(message.action);
        break;
    }
  }); // end of "message"

  ws.on('close', function(foo, bar) {
    delete PLAYERS[id];
    console.log(PLAYERS);
  });

})