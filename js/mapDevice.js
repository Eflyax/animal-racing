var MapDevice = (function (name, width, height) {
    var _that = this;

    var _width = width;
    var _name = name;
    var _height = height;

    return {
        getWidth: function () {
            return _width;
        },
        getHeight: function () {
            return _height;
        },
        getName: function () {
            return _name;
        }
    }
});