var Map = window.Map || {};

var Map = (function () {
    var _that = this;
    var _devices = [];
    var coeficient = 20;
    var svgContainer;

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
            .attr('viewBox', _devices[0].getWidth(coeficient) + ' 0 ' + _devices[1].getWidth(coeficient) + ' '+_devices[1].getHeight(coeficient));

        var lineData = [
            { "x": coeficient * 2, "y": coeficient * 2 },
            { "x": _devices[1].getWidth(coeficient), "y": 110 },
            { "x": _devices[1].getWidth(coeficient), "y": _devices[1].getHeight(coeficient) - coeficient },
        ];
        drawDevices();

        svgContainer.append("path")
            .attr("d", lineFunctionAproximateClosed(lineData))
            .attr("stroke", "black")
            .attr("stroke-width", 3)
            .attr("fill", "none");
    }

    function drawDevices() {
        var colors = ['purple', 'orange']
        var lineBasic = d3.svg.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            });
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

