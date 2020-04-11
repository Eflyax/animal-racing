var MapDevice = (function (name, width, height) {
    var _that = this;

    var _width = width;
    var _name = name;
    var _height = height;

    return {
        getWidth: function (coeficient) {
            if (!coeficient || coeficient <= 0) {
                coeficient = 1;
            }
            return coeficient * _width;
        },
        getHeight: function (coeficient) {
            if (!coeficient || coeficient <= 0) {
                coeficient = 1;
            }
            return coeficient * _height;
        },
        getName: function () {
            return _name;
        }
    }
});