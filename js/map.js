var Map = window.Map || {};

var Map = (function () {
    var _that = this;
    var _devices = [];
    var coeficient = 20;
    var svgContainer;
    var colors = ['purple', 'orange', 'cyan', 'brown', 'pink'];


    var lineBasic = d3.svg.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        });

    function generateTrack() {

        var totalWidth = 0;
        var totalHeight = 0;
        _devices.forEach(device => {
            totalWidth += device.getWidth();
            if (device.getHeight() > totalHeight) {
                totalHeight = device.getHeight();
            }
        });

        var margin = { top: 0, right: 0, bottom: 0, left: 0 };
        var width = ((totalWidth - margin.left - margin.right) * coeficient);
        var height = ((totalHeight - margin.top - margin.bottom) * coeficient);

        var lineFunctionAproximateClosed = d3.svg.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            })
            .interpolate("cardinal-closed");

        svgContainer = d3.select("body").append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            // .attr("width", width)
            // .attr("height", height)
            .attr('style', 'border: 1px solid purple')
            // .attr('viewBox', _devices[0].getWidth(coeficient) + ' 0 ' + _devices[1].getWidth(coeficient) + ' '+_devices[1].getHeight(coeficient));
            .attr('id', 'track');

        var lineData = [];
        var counter = 0;
        var startPoint;
        var currentWidthPointer = 0;

        // left => right
        _devices.forEach(function (item, index) {
            var itemWidthCm = item.getWidth(coeficient);
            var itemHeightCm = item.getHeight(coeficient);
            var pointFirst = { // left top
                "x": currentWidthPointer + randomNumber(0, itemWidthCm / 3) + coeficient,
                "y": (coeficient * 2) + randomNumber(0, itemHeightCm / 4)
            };
            lineData.push(pointFirst);
            if (counter === 0) {
                startPoint = pointFirst;
            }
            var pointSecond = { // right top
                "x": currentWidthPointer + (itemWidthCm / 2) + randomNumber(0, itemWidthCm / 4),
                "y": coeficient + randomNumber(1, itemHeightCm / 2)
            };
            lineData.push(pointSecond);
            counter++;
            currentWidthPointer += item.getWidth(coeficient);
        });

        // right => left
        for (index = _devices.length - 1; index > 0; index--) {
            item = _devices[index];
            var itemWidthCm = item.getWidth(coeficient);
            var itemHeightCm = item.getHeight(coeficient);
            var pointFirst = { // right bottom
                "x": currentWidthPointer - randomNumber(0, itemWidthCm / 3) - coeficient,
                "y": itemHeightCm - randomNumber(0, itemHeightCm / 3) - coeficient,
            };
            lineData.push(pointFirst);

            var pointSecond = { // left bottom
                "x": currentWidthPointer - (itemWidthCm / 2) - randomNumber(0, itemWidthCm / 4),
                "y": itemHeightCm - randomNumber(0, itemHeightCm / 3) - coeficient,
            };
            lineData.push(pointSecond);

            if (itemHeightCm > 10 && itemWidthCm > 10 && randomNumber(1, 2) == 1) { // todo - ANT code
                lineData.push({
                    'x': currentWidthPointer - itemWidthCm / 2 + randomNumber(-(itemWidthCm / 2), itemWidthCm / 2),
                    'y': itemHeightCm / 2 + randomNumber(-(itemHeightCm / 4), itemHeightCm / 4),
                });
            }

            if (index - 1 >= 0) {
                var itemOnLeftSide = _devices[index - 1];

                if (itemOnLeftSide.getHeight() > item.getHeight()) {
                    var point = {
                        "x": currentWidthPointer - itemWidthCm + randomNumber(0, coeficient),
                        "y": item.getHeight(coeficient) - randomNumber(coeficient * 2, item.getHeight(coeficient) / 4),
                    };
                } else {
                    var point = {
                        "x": currentWidthPointer - itemWidthCm + randomNumber(0, coeficient),
                        "y": itemOnLeftSide.getHeight(coeficient) - randomNumber(coeficient, coeficient * 2),
                    };
                }
                lineData.push(point);
            }
            currentWidthPointer -= item.getWidth(coeficient);
        }

        // drawDevices();
        svgContainer.append("path")
            .attr("d", lineFunctionAproximateClosed(lineData))
            // .attr("d", lineBasic(lineData))
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "none");
    }

    function randomNumber(from, to) {
        return Math.floor((Math.random() * to) + from);
    }

    function drawDevices() {

        var shiftX = 0;
        _devices.forEach(function (item, index) {
            var lineData2 = [
                { "x": shiftX, "y": 0 },
                { "x": shiftX + item.getWidth(coeficient), "y": 0 },
                { "x": shiftX + item.getWidth(coeficient), "y": item.getHeight(coeficient) },
                { "x": shiftX, "y": item.getHeight(coeficient) },
                { "x": shiftX, "y": 0 },
            ];
            svgContainer.append("path")
                .attr("d", lineBasic(lineData2))
                .attr("stroke", colors[index])
                .attr("stroke-width", 3)
                .attr("fill", colors[index]);
            shiftX += item.getWidth(coeficient);
        });
    }

    return {
        addDevice: function (device) {
            _devices.push(device);
        },
        getDevices: function () {
            return _devices;
        },
        getTrackInfo: function () {
            generateTrack();
        }
    }

});

