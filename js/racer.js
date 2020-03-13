var Racer = window.Racer || {};

Racer.Utils = (function () {

  var _that = this;
  var _transform;

  function initialize() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf('firefox') != -1) {
      _transform = 'MozTransform';
    } else if (agent.indexOf('msie') != -1) {
      _transform = 'msTransform';
    } else {
      _transform = 'WebkitTransform';
    }
  }

  return {
    init: function () {
      initialize();
    },

    getTransform: function () {
      return _transform;
    },

    drawLine: function (p1, p2, color, size) {
      var col = color || '#AAE727';
      var s = size || 0;
      var line = new Path({
        segments: [p1, p2],
        strokeColor: col,
        strokeWidth: s
      });
      return line;
    },

    drawPoint: function (p, color, size) {
      var col = color || '#AAE727';
      var s = size || 2;
      var point = new Shape.Circle(p, s);
      point.fillColor = col;
      return point;
    }
  }
})();


Racer.Game = (function () {

  var _track, _car;
  var _life = 5;
  var _points = 0;
  var _maxPoints = 0;

  var _scoreUI, _hearts, _restartUI;

  function initialize() {

    paper.install(window);
    paper.setup('track_canvas');

    Racer.Utils.init();

    _track = new Racer.Track();
    _car = new Racer.Car(_track.getPath());
    _scoreUI = document.getElementsByClassName('points')[0];
    _scoreUI.innerHTML = _points;

    _bestScoreUI = document.getElementsByClassName('best-points')[0];
    _hearts = document.querySelectorAll("div.lifes li");
    _restartUI = document.querySelector('a.start');
    _restartUI.addEventListener("click", restartGame);

    window.addEventListener("CarCrashed", onCarCrashed);
    window.addEventListener("CarRunning", onCarRunning);
    window.addEventListener("CarCrashEnded", onCarCrashEnded);

    addListener();

    TweenMax.to("div.lifes", .6, {ease: Cubic.easeInOut, left: -20, delay: .5});
    TweenMax.to("div.score", .6, {ease: Cubic.easeInOut, left: -20, delay: .4});
    _maxPoints = localStorage.getItem("bestScore") == null ? 0 : localStorage.getItem("bestScore");
    if (_maxPoints > 0) {
      _bestScoreUI.innerHTML = _maxPoints.toString();
      TweenMax.to("div.best-score", .6, {ease: Cubic.easeInOut, right: -20, delay: .8});
    }
  }

  function onCarCrashEnded() {
    if (_life > 0) {
      addListener();
      _car.afterCrash(true);
    } else {
      TweenMax.to("a.start", .3, {ease: Cubic.easeInOut, autoAlpha: 1});
      TweenMax.to("div.lifes", .4, {ease: Cubic.easeInOut, left: -200});
      _car.afterCrash(false);

      if (_points > _maxPoints) {
        if (_maxPoints == 0)
          TweenMax.to("div.best-score", .6, {ease: Cubic.easeInOut, right: -20});
        _maxPoints = _points;
        _bestScoreUI.innerHTML = _maxPoints.toString();
        localStorage.setItem("bestScore", _maxPoints);
      }
    }
  }

  function restartGame() {
    _car.reset();
    _life = 5;
    _points = 0;
    _scoreUI.innerHTML = _points;
    updateHearts();
    addListener();


    TweenMax.to("a.start", .1, {ease: Cubic.easeInOut, autoAlpha: 0});
    TweenMax.to("div.lifes", .6, {ease: Cubic.easeInOut, left: -20});
  }

  function accelerate(e) {
    _car.accelerate();
    e.preventDefault();
  }

  function brake(e) {
    _car.brake();
    e.preventDefault();
  }

  function addListener() {
    window.addEventListener('mousedown', accelerate);
    window.addEventListener('mouseup', brake);

    document.body.addEventListener('touchstart', accelerate);
    document.body.addEventListener('touchend', brake);
  }

  function removeListener() {
    window.removeEventListener('mousedown', accelerate);
    window.removeEventListener('mouseup', brake);

    document.body.removeEventListener('touchstart', accelerate);
    document.body.removeEventListener('touchend', brake);
  }

  function onCarRunning(e) {
    _points += e.detail;
    _scoreUI.innerHTML = _points;
  }

  function onCarCrashed(e) {
    _life--;
    updateHearts();
    removeListener();
  }

  function updateHearts() {
    for (var i = 0; i < _hearts.length; i++) {
      if (i < _life) _hearts[i].style.opacity = 1;
      else _hearts[i].style.opacity = .2;
    }
  }


  return {
    init: function () {
      initialize();
    },

    restart: function () {

    }

  }
})();

Racer.Track = function () {
  var _that = this;
  var _canvas, _context, _path;

  function initialize() {

    _canvas = document.getElementById('track_canvas');
    _context = _canvas.getContext('2d');

    var svg = document.getElementById('track');
    var layer = new Layer();


    var p = layer.importSVG(svg, function (path, svg) {
      path.strokeColor = '#d9caec';
      path.strokeWidth = 12;
      _path = path.children['circuit'];
    });

    // var pathData = 'M98.36,214.208l2.186-1.093V210.2l-3.378,0.117l1.174,4.137L98.36,214.208z';
    // var path = new Path(pathData);
    // path.strokeColor = 'black';
    // path.scale(10);
    // layer.path = path;

    paper.view.draw();
  }

  this.getPath = function () {
    return _path;
  }

  initialize();
}

Racer.Car = function (path, acceleration, friction, speed, sliding_friction) {

  var ACCELERATION = acceleration || 0.8;
  var FRICTION = friction || 0.9;
  var SPEED = speed || 20;
  var SLIDING_FRICTION = sliding_friction || 4.1;
  var ROTATION_ON_EXIT = 60;

  var _that = this;
  var _path = path;
  var _rotation, _elapsed, _velocity, _throttle;
  var _rotationExit, _elapsedExit, _pathExit;
  var _car, _container;
  var _lastPoint;
  var _in = true;

  function initPosition() {

    _rotationExit = 0;
    _elapsedExit = 0;

    _rotation = 0;
    _elapsed = 0;
    _velocity = new Point(0, 0);
    _velocity.length = 0;
    _throttle = 0;

    _position = _path.getPointAt(_elapsed);

    renderCar(_position);
  }

  function initialize() {
    _container = document.getElementById('track_container');
    _car = document.getElementsByClassName('image')[0];
    _layer = new Layer();
    _layer.activate();
    initPosition();
    requestAnimationFrame(render);
  }

  function accelerate() {
    _throttle = ACCELERATION;
  }

  function brake() {
    _throttle = 0;
  }

  function calculateSpeed() {
    if (_throttle) {
      _velocity.length += _throttle;
      if (_velocity.length > SPEED)
        _velocity.length = SPEED;
    } else {
      _velocity.length *= FRICTION;
    }
  }

  function render() {
    calculateSpeed();
    var trackOffset = _elapsed % _path.length;
    var trackPoint = _path.getPointAt(trackOffset);
    var trackTangent = _path.getTangentAt(trackOffset);
    var trackAngle = trackTangent.angle;
    _lastPoint = trackPoint;
    _velocity.angle = trackAngle;
    if (_in) {
      _elapsed += _velocity.length;
      if (_velocity.length > 0.1)
        renderCar(trackPoint);
    } else {
      var trackOffsetExit = _elapsedExit % _pathExit.length;
      var trackPointExit = _pathExit.getPointAt(trackOffsetExit);
      _rotationExit *= FRICTION;
      _elapsedExit += _velocity.length;
      if (_velocity.length > 0.1)
        renderCrash(trackPointExit);
      else {

        var carCrashEndedEvent = new CustomEvent("CarCrashEnded");
        window.dispatchEvent(carCrashEndedEvent);
      }
    }

    requestAnimationFrame(render);
  }

  function resetPosition() {

    initPosition();
  }

  function restartAfterCrash() {


    _rotation = _velocity.angle;
    _rotation = parseFloat(_rotation.toFixed(20));
    _rotation = _rotation.toFixed(10);
    _position = _lastPoint;
    _position.x = parseFloat(_position.x.toFixed(20));
    _position.y = parseFloat(_position.y.toFixed(20));

    updateCarPosition();
  }

  function updateCarPosition() {
    _car.style[Racer.Utils.getTransform()] = 'translate3d(' + _position.x + 'px, ' + _position.y + 'px, 0px)rotate(' + _rotation + 'deg)';
  }

  function renderCrash(point) {
    _rotation = parseFloat(_rotation);
    _rotation = _rotation + _rotationExit;
    _rotation = _rotation.toFixed(10);
    _position = point;
    _position.x = parseFloat(_position.x.toFixed(20));
    _position.y = parseFloat(_position.y.toFixed(20));
    updateCarPosition();
  }

  function renderCar(point) {
    _layer.removeChildren();

    var offset = _path.getOffsetOf(point);
    var offset_prev = _path.getOffsetOf(_position);
    var offset_mid = (offset + offset_prev) / 2;

    var point_angle = _path.getTangentAt(offset).angle;
    var prev_point_angle = _path.getTangentAt(offset_mid).angle;
    var direction = -1;

    if (parseFloat(prev_point_angle) > parseFloat(point_angle))
      direction = 1;

    var normalAtPosition = _path.getNormalAt(offset).multiply(1000 * direction);
    var normalAtPoint = _path.getNormalAt(offset_prev).multiply(1000 * direction);


    var l1 = Racer.Utils.drawLine(point, point.add(normalAtPosition), null, 1);
    var l2 = Racer.Utils.drawLine(_path.getPointAt(offset_prev), _path.getPointAt(offset_prev).add(normalAtPoint), '#2895FF', 1);

    var maxVelocity = Infinity;
    var intersection = l1.getIntersections(l2);

    if (intersection.length > 0) {
      var midpoint = _position.add(point).divide(2);
      var distance = intersection[0].point.getDistance(midpoint);
      maxVelocity = Math.sqrt(distance * SLIDING_FRICTION);

      if (maxVelocity > 0 && _velocity.length > maxVelocity) {
        _pathExit = Racer.Utils.drawLine(point, point.add(_velocity.multiply(50)), null, 0);
        _elapsedExit = 0;
        _rotationExit = ROTATION_ON_EXIT;
        _throttle = 0;
        _in = false;

        var carCrashedEvent = new CustomEvent("CarCrashed");
        window.dispatchEvent(carCrashedEvent);
      }
    }

    l1.remove();
    l2.remove();

    paper.view.draw();

    var score = Math.round(5 * _velocity.length) - 1;
    var carRunggingEvent = new CustomEvent("CarRunning", {"detail": score});
    window.dispatchEvent(carRunggingEvent);

    _rotation = _velocity.angle;
    _rotation = parseFloat(_rotation.toFixed(20));
    _rotation = _rotation.toFixed(10);
    _position = point;
    _position.x = parseFloat(_position.x.toFixed(20));
    _position.y = parseFloat(_position.y.toFixed(20));
    updateCarPosition();
  }

  this.accelerate = function () {
    accelerate();
  }
  this.brake = function () {
    brake();
  }
  this.afterCrash = function (restart) {
    _in = true;
    if (restart == true)
      restartAfterCrash();
  }
  this.reset = function () {
    resetPosition();
  }

  initialize();

};
