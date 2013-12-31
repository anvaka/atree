// Generated by CoffeeScript 1.6.3
(function() {
  var Spiral, Tree, tree;

  Spiral = (function() {
    var SpiralShadow, computeLineSegments, factor, getPointByAngle, getdtheta, linelength, linespacing, projectTo2d, rate, shapeColor, spiralShadows, thetamax, thetamin, xscreenoffset, xscreenscale, ycamera, yscreenoffset, yscreenscale, zcamera;

    thetamin = 0;

    thetamax = 6 * Math.PI;

    rate = 1 / (2 * Math.PI);

    factor = rate / 3;

    linespacing = 1 / 30;

    linelength = linespacing / 2;

    xscreenoffset = 260;

    yscreenoffset = 300;

    xscreenscale = 360;

    yscreenscale = 360;

    ycamera = 2;

    zcamera = -3;

    SpiralShadow = (function() {
      function SpiralShadow(offset, factor_rate, color_rate) {
        this.offset = offset;
        this.factor_rate = factor_rate;
        this.color_rate = color_rate;
      }

      return SpiralShadow;

    })();

    spiralShadows = [new SpiralShadow(0, 1, 0), new SpiralShadow(Math.PI * 0.05, 0.93, -0.7), new SpiralShadow(Math.PI * 0.08, 0.9, -0.85)];

    function Spiral(foreground, angleoffset, period, config) {
      this.foreground = foreground;
      this.angleoffset = angleoffset;
      this.period = period;
      if (config == null) {
        config = {};
      }
      this.spacing = config.spacing || 1 / 30;
      this.rate = config.rate || 1 / (2 * Math.PI);
      this.offset = 0;
      this.factor = config.factor || factor;
      this.linelength = config.linelength || linelength;
      this.computedLineSegments = computeLineSegments(this);
    }

    Spiral.prototype.lineSegments = function(offset) {
      return this.computedLineSegments[offset];
    };

    computeLineSegments = function(s) {
      var inc, lineSegments, lines, offset, spiralShadow, theta, thetanew, thetaold, _i, _len;
      lineSegments = {};
      offset = 0;
      while (offset > -s.period) {
        lineSegments[offset] = lines = [];
        for (_i = 0, _len = spiralShadows.length; _i < _len; _i++) {
          spiralShadow = spiralShadows[_i];
          theta = thetamin + getdtheta(thetamin, offset * s.spacing / s.period, s.rate, s.factor * spiralShadow.factor_rate);
          while (theta < thetamax) {
            inc = getdtheta(theta, linespacing, rate, factor);
            thetaold = theta >= thetamin ? theta : thetamin;
            thetanew = theta + getdtheta(theta, linelength, rate, factor);
            theta += inc;
            if (thetanew <= thetamin) {
              continue;
            }
            lines.push({
              start: getPointByAngle(thetaold, s.factor * spiralShadow.factor_rate, s.angleoffset - spiralShadow.offset, s.rate),
              end: getPointByAngle(thetanew, s.factor * spiralShadow.factor_rate, s.angleoffset - spiralShadow.offset, s.rate),
              color: shapeColor(s.foreground, spiralShadow.color_rate)
            });
          }
        }
        offset--;
      }
      return lineSegments;
    };

    getPointByAngle = function(theta, factor, offset, rate) {
      var point, x, y, z;
      x = theta * factor * Math.cos(theta + offset);
      y = rate * theta;
      z = -theta * factor * Math.sin(theta + offset);
      point = projectTo2d(x, y, z);
      point.alpha = Math.atan((y * factor / rate * 0.1 + 0.02 - z) * 40) * 0.35 + 0.65;
      return point;
    };

    projectTo2d = function(x, y, z) {
      return {
        x: xscreenoffset + xscreenscale * (x / (z - zcamera)),
        y: yscreenoffset + yscreenscale * ((y - ycamera) / (z - zcamera))
      };
    };

    getdtheta = function(theta, lineLength, rate, factor) {
      return lineLength / Math.sqrt(rate * rate + factor * factor * theta * theta);
    };

    shapeColor = function(hex, lum) {
      var c, i, rgb, _i;
      hex = String(hex).replace(/[^0-9a-f]/g, "");
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;
      rgb = "#";
      i = 0;
      for (i = _i = 0; _i < 3; i = ++_i) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
      }
      return rgb;
    };

    return Spiral;

  })();

  Tree = (function() {
    var height, period, spiralWithShadow, width;

    period = 5;

    width = 500;

    height = 500;

    function Tree(elem, config) {
      this.elem = document.getElementById(elem);
      this.width = config.width || width;
      this.height = config.height || height;
      this.offset = 0;
      this.elem.setAttribute('width', "" + this.width + "px");
      this.elem.setAttribute('height', "" + this.height + "px");
      this.ctx = this.elem.getContext('2d');
      this.spirals = [new Spiral('#ff0000', Math.PI, period), new Spiral('#00ffcc', 0, period)];
    }

    Tree.prototype.run = function() {
      this.requestAnimationFrame();
      return this.renderFrame();
    };

    Tree.prototype.renderFrame = function() {
      var spiral, _i, _len, _ref, _results;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.beginPath();
      this.offset -= 1;
      if (this.offset <= -period) {
        this.offset += period;
      }
      _ref = this.spirals;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spiral = _ref[_i];
        _results.push(this.renderObject(spiral.lineSegments(this.offset)));
      }
      return _results;
    };

    Tree.prototype.renderObject = function(segments) {
      var segment, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = segments.length; _i < _len; _i++) {
        segment = segments[_i];
        this.stroke(segment.color, segment.start.alpha);
        this.ctx.moveTo(segment.start.x, segment.start.y);
        _results.push(this.ctx.lineTo(segment.end.x, segment.end.y));
      }
      return _results;
    };

    Tree.prototype.stroke = function(color, alpha) {
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.strokeStyle = color;
      this.ctx.globalAlpha = alpha;
      return this.ctx.beginPath();
    };

    Tree.prototype.requestAnimationFrame = function() {
      var _this = this;
      return window.setTimeout(function() {
        return _this.run();
      }, 1000 / 24);
    };

    spiralWithShadow = function(color, period, offset) {};

    return Tree;

  })();

  tree = new Tree('scene', {});

  tree.run();

}).call(this);
