const RoomManager = require("../RoomManager");
const Room = require("../Room");

var roomManager = new RoomManager();

function ConsumerCreateLobby() {
}

ConsumerCreateLobby.prototype.consume = function consume(id, ws, message) {
    var existingRoom = roomManager.findOneBy('code', message.gameCode);
    var error = existingRoom ? 'roomAlreadyExists' : null;
    ws.send(JSON.stringify({ action: 'CREATE_LOBBY', 'error': error }));
    if (!error) {
        var newRoom = new Room(message.gameCode);
        newRoom.setIdLeader(id);
        ROOMS[id] = newRoom;
    }
};

module.exports = ConsumerCreateLobby;