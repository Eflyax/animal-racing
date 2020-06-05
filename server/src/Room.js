function Room(code) {
    this.code = code;
    this.idLeader
}

Room.prototype.setIdLeader = function setIdLeader(id) {
    this.idLeader = id;
};

module.exports = Room;