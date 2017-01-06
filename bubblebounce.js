var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = window.innerWidth, cx = cw / 2;
var ch = canvas.height = window.innerHeight, cy = ch / 2;
var requestID = null;
var balls = [];
var numBalls = 40;
var friction = 0.98;
var offset = 180;
var m = {
  x: -offset,
  y: -offset
};

function Ball() {
  this.r = Math.random() * 50 + 20;
  this.h = Math.random() * 360;
  this.s = Math.random() * 10 + 15;
  this.isStill = true;

  this.Pos = {
    x: Math.random() * cw,
    y: Math.random() * ch
  };
  this.Velocity = {
    xVel: (-12 + Math.random() * 24),
    yVel: (-9 + Math.random() * 18)
  };
  this.currentVelocity = {
    xCurrVel: 0,
    yCurrVel: 0
  };

  this.update = function(m) {
    if (this.isStill) {
      if (dist(this.Pos, m) <= 80) {
        this.Pos.x += this.currentVelocity.xCurrVel;
        this.Pos.y += this.currentVelocity.yCurrVel;
        this.isStill = false;
      }
    } else {
      this.bouncing();
      this.currentVelocity.xCurrVel = this.currentVelocity.xCurrVel * friction;
      this.currentVelocity.yCurrVel = this.currentVelocity.yCurrVel * friction;
      this.Pos.x += this.currentVelocity.xCurrVel * friction;
      this.Pos.y += this.currentVelocity.yCurrVel * friction;
      if (Math.abs(this.currentVelocity.xCurrVel) <= 0.4){
        this.currentVelocity.xCurrVel = 0;
      }
      if (Math.abs(this.currentVelocity.yCurrVel) <= 0.4){
        this.currentVelocity.yCurrVel = 0;
      }
      if (this.currentVelocity.xCurrVel == 0 && this.currentVelocity.yCurrVel == 0) {
        this.isStill = true;
        this.currentVelocity.xCurrVel = this.Velocity.xVel;
        this.currentVelocity.yCurrVel = this.Velocity.yVel;
      }
    }
  }
  
  this.bouncing = function(){
    if (this.Pos.x + this.r > cw){
      this.currentVelocity.x = Math.abs(this.currentVelocity.x)*(-1);
      this.Velocity.x = this.Velocity.x * (-1);
    }
    if (this.Pos.x - this.r < 0) {
      this.currentVelocity.x = Math.abs(this.currentVelocity.x);
      this.Velocity.x = this.Velocity.x * (-1);
      console.log("A ball bounced")
    }
    if (this.Pos.y + this.r > ch || this.Pos.y - this.r < 0){
      this.currentVelocity.y = this.currentVelocity.y *(-1);
    }
  }

  this.draw = function() {
    ctx.fillStyle = Grd(this.Pos.x, this.Pos.y, this.r, this.h, this.s);
    ctx.beginPath();
    ctx.arc(this.Pos.x, this.Pos.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

}

for (var i = 0; i < numBalls; i++) {
  balls.push(new Ball());
}

function Draw() {
  requestID = window.requestAnimationFrame(Draw);
  ctx.clearRect(0,0, cw, ch);

  for (var i = 0; i < balls.length; i++) {
    balls[i].update(m);
    balls[i].draw();
  }
}

var Init = function() {
  if (requestID) {
    window.cancelAnimationFrame(requestID);
    requestID = null;
  }
  cw = canvas.width = window.innerWidth, cx = cw / 2;
  ch = canvas.height = window.innerHeight, cy = ch / 2;

  balls.length = 0;
  for (var i = 0; i < numBalls; i++) {
    balls.push(new Ball());
  }
  Draw();
}

window.setTimeout(function() {
  Init();
  window.addEventListener("resize", Init, false);
}, 15);

var timeout;
canvas.addEventListener("mousemove", function(evt) {
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    m = {
      x: -offset,
      y: -offset
    };
  }, 600);
  m = oMousePos(canvas, evt);
}, false);

function dist(p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx*dx + dy*dy);
}

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  };
}

function Grd(x, y, r, h, s) {
  grd = ctx.createRadialGradient(x - .3 * r, y - .3 * r, 0, x - .3 * r, y - .3 * r, r);
  grd.addColorStop(0, 'hsla(' + h + ',' + s + '%,95%,.95)');
  grd.addColorStop(0.4, 'hsla(' + h + ',' + s + '%,55%,.85)');
  grd.addColorStop(1, 'hsla(' + h + ',' + s + '%,35%,.85)');
  return grd;
}