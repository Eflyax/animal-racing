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
        console.log(totalWidth + ' x ' + totalHeight);



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
            .attr("width", width)
            .attr("height", height)
            .attr('style', 'border: 1px solid purple');

        var lineData = [
            { "x": 15, "y": 10 },
            { "x": 15, "y": 110 },
            { "x": 100, "y": 110 },
            { "x": 30, "y": 80 },
            { "x": 90, "y": 40 },
            { "x": 110, "y": 70 },
        ];
        svgContainer.append("path")
            .attr("d", lineFunctionAproximateClosed(lineData))
            .attr("stroke", "blue")
            .attr("stroke-width", 3)
            .attr("fill", "none");
        drawDevices();
    }

    function drawDevices() {
        var lineBasic = d3.svg.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            });
        var shiftX = 0;
        _devices.forEach(function (item) {
            var lineData2 = [
                { "x": shiftX, "y": 0 },
                { "x": shiftX + item.getWidth(coeficient), "y": 0 },
                { "x": shiftX + item.getWidth(coeficient), "y": item.getHeight(coeficient) },
                { "x": shiftX, "y": item.getHeight(coeficient) },
                { "x": shiftX, "y": 0 },
            ];
            svgContainer.append("path")
                .attr("d", lineBasic(lineData2))
                .attr("stroke", "red")
                .attr("stroke-width", 3)
                .attr("fill", "none");
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

