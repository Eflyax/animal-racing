function RoomManager() {
}

RoomManager.prototype.findOneBy = function findOneBy(key, value) {
    var foundedEntity = null;
    ROOMS.map(function (item) {
        if (item[key] == value) {
            foundedEntity = item;
            return;
        }
    });

    return foundedEntity;
};

module.exports = RoomManager;