// Code goes here
var  max = 19, r = 8.0, step = 24;

function run() {
  var c = document.getElementById('scene');
  var ctx=c.getContext("2d");
  var i, x, z, zoff;
  
  
  for (i = 0; i < max+0.2; i += 0.01) {
    zoff = i * Math.sin(i);
    z = 250/(300 + zoff);
    x = -i * r * Math.cos(i) * z +255;
    if (zoff < 0) {
      ctx.fillStyle="#ff0000";    
    } else {
      ctx.fillStyle="#660000";    
    }
    ctx.fillRect(x, i*step*z, 1,1);
    ctx.stroke();
  }
  
  for (i = 0; i < max-0.3; i += 0.01) {
    zoff = i * Math.sin(i);
    z = 250/(300 - zoff);
    x = i * r * Math.cos(i) * z + 255;
    if (zoff < 0) {
      ctx.fillStyle="#003333";    
    } else {
      ctx.fillStyle="#00ffff";    
    }
    
    ctx.fillRect(x, i*step*z, 1,1);
    ctx.stroke();
  }
  
}
