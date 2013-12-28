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
    this.draw = function(ctx) {
      var startcoord, startproject, endcoord, endproject, alpha;

      this.offset -= 1;
      if (this.offset<0)
        this.offset += this.period;

      if (!this.cache[this.offset]){
        this.cache[this.offset] = [];
        for (var theta=getdtheta(0, this.offset*this.spacing/this.period, this.rate, this.factor); theta<thetamax; theta+=getdtheta(theta, this.spacing, this.rate, this.factor)){

          startcoord   = getcoord(theta, this);
          startproject = project(startcoord);

          endcoord     = getcoord(theta+getdtheta(theta, this.linelength, this.rate, this.factor), this);
          endproject   = project(endcoord);

          alpha = Math.atan((startcoord[1]*this.factor/this.rate*0.1+0.02-startcoord[2])*40)*0.35+0.65;

          switchColor(this.foreground, alpha);

          ctx.moveTo(startproject[0], startproject[1]);
          ctx.lineTo(endproject[0],   endproject[1]  );

          this.cache[this.offset].push(startproject, endproject, alpha)
        }

      } else {
        var offsetcache = this.cache[this.offset];
        for(var i = 0; i < offsetcache.length; i+=3){
          switchColor(this.foreground, offsetcache[i+2])
          ctx.moveTo(offsetcache[i][0], offsetcache[i][1]);
          ctx.lineTo(offsetcache[i+1][0], offsetcache[i+1][1]);
        }
      }

    }

  }

  function switchColor(color, alpha) {
    ctx.closePath();
    //ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
  }

  function getcoord(theta, that) {
    return [theta*that.factor*Math.cos(theta+that.angleoffset),
            that.rate*theta,
            theta*that.factor*-Math.sin(theta+that.angleoffset)]
  }

  function getdtheta(theta, length, rate, factor){
    return length/Math.sqrt(rate*rate+factor*factor*theta*theta);
  }

  function project(coord) {
    return [xscreenoffset+xscreenscale*(coord[0]/(coord[2]-zcamera)),
            yscreenoffset+yscreenscale*((coord[1]-ycamera)/(coord[2]-zcamera))]
  }
}
