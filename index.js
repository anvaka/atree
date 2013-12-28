var thetamin = 0,
    thetamax = 6*Math.PI,
    period = 5,
    linespacing = 1/30,
    linelength = linespacing/2,
    yscreenoffset = 300,
    xscreenoffset = 260,
    xscreenscale = 360,
    yscreenscale = 360,
    ycamera = 2,
    zcamera = -3,

    rate = 1/(2*Math.PI), // every rotation y gets one bigger
    factor = rate/3;

function run() {
  var ctx = document.getElementById('scene').getContext('2d'),
        redSpiral = new Spiral({
      foreground: "#ff0000",
      angleoffset: Math.PI
    }),
    redSpiralShadow = new Spiral({
      foreground: "#660000",
      angleoffset: Math.PI*0.95,
      factor: 0.93*factor
    }),
    redSpiralShadow2 = new Spiral({
      foreground: "#440000",
      angleoffset: Math.PI*0.92,
      factor: 0.90*factor
    }),
    cyanSpiral = new Spiral({
      foreground: "#00ffcc",
      angleoffset: 0,
    }),
    cyanSpiralShadow = new Spiral({
      foreground: "#003322",
      angleoffset: -Math.PI*0.05,
      factor:0.93*factor
    }),
    cyanSpiralShadow2= new Spiral({
      foreground: "#002211",
      angleoffset: -Math.PI*0.08,
      factor:0.90*factor
    })


  animationLoop();


  function animationLoop() {
    window.setInterval(renderFrame, 1000 / 24);
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
    this.foreground = config.foreground;
    this.angleoffset = config.angleoffset || 0;
    this.period = config.period || period;
    this.spacing = config.spacing || linespacing;
    this.linelength = config.linelength || linelength;
    this.offset = 0;
    this.rate = config.rate || rate;
    this.factor = config.factor || factor;
    this.cache = {};
    this.buffer = function() {
      var startx, starty, startz, endx, endy, endz, startpx, startpy, endpx, endpy, alpha, thetanew, tempcache, thetaold;
      for (var offset=0; offset>-this.period; offset--){
        tempcache = [];
        for (var theta=thetamin+getdtheta(thetamin, offset*this.spacing/this.period, this.rate, this.factor); theta<thetamax; theta+=getdtheta(theta, this.spacing, this.rate, this.factor)){

          thetaold = (theta>=thetamin)?theta:thetamin;

          startx = getcoordx(thetaold, this);
          starty = getcoordy(thetaold, this);
          startz = getcoordz(thetaold, this);
          startpx = projectx(startx, starty, startz);
          startpy = projecty(startx, starty, startz);

          thetanew = theta+getdtheta(theta, this.linelength, this.rate, this.factor);
          if (thetanew <= thetamin)
            continue;
          endx = getcoordx(thetanew, this);
          endy = getcoordy(thetanew, this);
          endz = getcoordz(thetanew, this);
          endpx = projectx(endx, endy, endz);
          endpy = projecty(endx, endy, endz);

          alpha = Math.atan((starty*this.factor/this.rate*0.1+0.02-startz)*40)*0.35+0.65;

          tempcache.push(startpx, startpy, endpx, endpy, alpha)
        }
        this.cache[offset] = new Float32Array(tempcache);
      }
    };
    this.draw = function(ctx) {
      this.offset -= 1;
      if (this.offset<=-this.period)
        this.offset += this.period;

      var offsetcache = this.cache[this.offset];

      for(var i = 0; i < offsetcache.length; i+=5){
        switchColor(this.foreground, offsetcache[i+4])
        ctx.moveTo(offsetcache[i], offsetcache[i+1]);
        ctx.lineTo(offsetcache[i+2], offsetcache[i+3]);
      }
    };
    this.buffer();
  }

  function switchColor(color, alpha) {
    ctx.closePath();
    //ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
  }

  function getcoordx(theta, that) {
    return theta*that.factor*Math.cos(theta+that.angleoffset)
  }

  function getcoordy(theta, that) {
    return that.rate*theta
  }

  function getcoordz(theta, that) {
    return theta*that.factor*-Math.sin(theta+that.angleoffset)
  }

  function getdtheta(theta, length, rate, factor){
    return length/Math.sqrt(rate*rate+factor*factor*theta*theta);
  }

  function projectx(x,y,z) {
    return xscreenoffset+xscreenscale*(x/(z-zcamera))
  }

  function projecty(x,y,z){
    return yscreenoffset+yscreenscale*((y-ycamera)/(z-zcamera))
  }
}
