function Player(name, socketId, socket) {
    this.name = name;
    this.socket = socket;
    this.socketId = socketId;
}

module.exports = Player;