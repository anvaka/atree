var thetamin = 0,
  thetamax = 6 * Math.PI,
  period = 5,
  linespacing = 1 / 30,
  linelength = linespacing / 2,
  yscreenoffset = 300,
  xscreenoffset = 260,
  xscreenscale = 360,
  yscreenscale = 360,
  ycamera = 2,
  zcamera = -3,

  rate = 1 / (2 * Math.PI), // every rotation y gets one bigger
  factor = rate / 3;

function run() {
  var ctx = document.getElementById('scene').getContext('2d'),
    redSpiral = new Spiral({
      foreground: "#ff0000",
      angleoffset: Math.PI,
      factor: factor
    }),
    redSpiralShadow = new Spiral({
      foreground: "#660000",
      angleoffset: Math.PI * 0.95,
      factor: 0.93 * factor
    }),
    redSpiralShadow2 = new Spiral({
      foreground: "#220000",
      angleoffset: Math.PI * 0.92,
      factor: 0.90 * factor
    }),
    cyanSpiral = new Spiral({
      foreground: "#00ffcc",
      angleoffset: 0,
      factor: factor
    }),
    cyanSpiralShadow = new Spiral({
      foreground: "#003322",
      angleoffset: -Math.PI * 0.05,
      factor: 0.93 * factor
    }),
    cyanSpiralShadow2 = new Spiral({
      foreground: "#002211",
      angleoffset: -Math.PI * 0.08,
      factor: 0.90 * factor
    });

  render();

  function render() {
    requestAnimationFrame(render);
    renderFrame();
  }

  function renderFrame() {
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();

    redSpiralShadow2.draw(ctx);
    cyanSpiralShadow2.draw(ctx);

    redSpiralShadow.draw(ctx);
    cyanSpiralShadow.draw(ctx);

    redSpiral.draw(ctx);
    cyanSpiral.draw(ctx);
  }

  function Spiral(config) {
    this.period = config.period || period;
    this.spacing = config.spacing || linespacing;
    this.offset = 0;
    this.rate = config.rate || rate;
    this.linelength = config.linelength || linelength;

    var angleoffset = config.angleoffset || 0;
    var _factor = config.factor || factor;
    var lineSegments = computeLineSegments.call(this);

    this.draw = function(ctx) {
      this.offset -= 1;
      if (this.offset <= -this.period) {
        this.offset += this.period;
      }

      lineSegments[this.offset].forEach(drawLineSegment);
    };

    function drawLineSegment(segment) {
      stroke(config.foreground, segment.start.alpha);
      ctx.moveTo(segment.start.x, segment.start.y);
      ctx.lineTo(segment.end.x, segment.end.y);
    }

    function computeLineSegments() {
      var lineSegments = {};
      var factor = config.factor;
      var thetanew, pointsAtOffset, thetaold, rate = this.rate;
      for (var offset = 0; offset > -this.period; offset--) {
        lineSegments[offset] = lines = [];
        for (var theta = thetamin + getdtheta(thetamin, offset * this.spacing / this.period, rate, factor); theta < thetamax; theta += getdtheta(theta, this.spacing, rate, factor)) {
          thetaold = (theta >= thetamin) ? theta : thetamin;
          thetanew = theta + getdtheta(theta, this.linelength, rate, factor);

          if (thetanew <= thetamin) {
            continue;
          }

          lines.push({
            start: getPointByAngle(thetaold, factor, angleoffset, rate),
            end: getPointByAngle(thetanew, factor, angleoffset, rate)
          });
        }
      }

      return lineSegments;
    }
  }

  function stroke(color, alpha) {
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
  }

  function getPointByAngle(theta, factor, angleoffset, rate) {
    var x = theta * factor *  Math.cos(theta + angleoffset);
    var z = - theta * factor * Math.sin(theta + angleoffset);
    var y = rate * theta;
    // now that we have 3d coorinates, project them into 2d space:
    var point = projectTo2d(x, y, z);
    // calculate point's color alpha level:
    point.alpha = Math.atan((y * factor / rate * 0.1 + 0.02 - z) * 40) * 0.35 + 0.65;

    return point;
  }

  function getdtheta(theta, length, rate, factor) {
    return length / Math.sqrt(rate * rate + factor * factor * theta * theta);
  }

  function projectTo2d(x, y, z) {
    return {
      x: xscreenoffset + xscreenscale * (x / (z - zcamera)),
      y: yscreenoffset + yscreenscale * ((y - ycamera) / (z - zcamera))
    };
  }

  // I actually want it to be slower then 60fps
  function requestAnimationFrame(callback) {
    window.setTimeout(callback, 1000 / 24);
  }
}
