const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9000 })
const Room = require("./src/Room");
const RoomManager = require("./src/RoomManager");
const Player = require("./src/Player");

ROOMS = [];
PLAYERS = [];

var roomManager = new RoomManager();
console.log('Server started');

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  var id = req.headers['sec-websocket-key'];

  PLAYERS[id] = (new Player('Eflyax', id, ws));

  ws.on('message', message => {
    var message = JSON.parse(message);

    switch (message.action) {
      case 'CREATE_LOBBY':
        var existingRoom = roomManager.findOneBy('code', message.gameCode);
        var error = existingRoom ? 'roomAlreadyExists' : null;
        ws.send(JSON.stringify({ action: 'CREATE_LOBBY', 'error': error }));
        if (!error) { // room does not exist
          var newRoom = new Room(message.gameCode);
          newRoom.setIdLeader(id);
          ROOMS[id] = newRoom;
        }
        break;
      default:
        console.log('neznámá akce');
        console.log(message);
        console.log(message.action);
        break;
    }
  }); // end of "message"

  ws.on('close', function () {
    delete PLAYERS[id];
    delete ROOMS[id]; // todo - odpojit ostatní hráče z roomky
  });

})