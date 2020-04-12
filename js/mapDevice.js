var MapDevice = (function (name, width, height, widthPixels, heightPixels) {
    var _that = this;

    var _name = name;
    var _width = width;
    var _height = height;
    var _widthPixels = widthPixels;
    var _heightPixels = heightPixels;

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
        getWidthPixels: function () {
            return _widthPixels;
        },
        getHeightPixels: function () {
            return _heightPixels;
        },
        getName: function () {
            return _name;
        }
    }
});