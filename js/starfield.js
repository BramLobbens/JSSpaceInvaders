// Define the starfield class
function Starfield() {
    this.fps =30;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.minVelocity = 15;
    this.maxVelocity = 30;
    this.stars = 100;
    this.intervalId = 0;
};

function Star(x, y, size, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = velocity;
};

Starfield.prototype.initialise = function(div) {
    var _this = this;
    
    // Store the div
    this.containerDiv = div;
    _this.width = 800;//window.innerWidth;
    _this.height = 800;//window.innerHeight;
    
    window.addEventListener('resize', function resize(event) {
        _this.width = 800;//window.innerWidth;
        _this.height = 800;//window.innerHeight;
        _this.canvas.width = _this.width;
        _this.canvas.height = _this.height;
        _this.draw();
    });
    
    // Create the canvas
    var canvas = document.createElement('canvas');
    canvas.id = 'starfield-canvas';
    div.appendChild(canvas);
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
};

Starfield.prototype.start = function() {
    
    // Create the stars
    var stars = [];
    for (var i=0; i<this.stars; i++) {
        stars[i] = new Star(Math.random()*this.width, 
                            Math.random()*this.height, 
                            Math.random()*3+1,
                           (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
    }
    this.stars = stars;
    
    var _this = this;
    // Start the timer
    this.intervalId = setInterval(function() {
        _this.update();
        _this.draw();
    }, 1000 / this.fps);
};

Starfield.prototype.update = function() {
    var dt = 1 / this.fps;
    for(var i=0; i<this.stars.length; i++) {
        var star = this.stars[i];
        star.y += dt * star.velocity;
        // If the star has moved from the bottom of the screen, spawn it at the top
        if(star.y > this.height) {
            this.stars[i] = new Star(Math.random()*this.width,
                                    0,
                                    Math.random()*3+1,
                                    (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
        }
    }
};

Starfield.prototype.draw = function() {
    
    // Get the drawing context
    var ctx = this.canvas.getContext('2d');
    
    // Draw the background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw the Stars
    ctx.fillStyle = '#ffffff';
    for(var i=0; i<this.stars.length;i++) {
        var star = this.stars[i];
        ctx.fillRect(star.x, star.y, star.size, star.size);
    }
};


// Create the starfield
var container = document.getElementById('starfield-container');
var starfield = new Starfield();
starfield.initialise(container);
starfield.start();