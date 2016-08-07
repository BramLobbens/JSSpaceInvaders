;(function() {
    var loadingMessage = "Initialising...";
    var loadedMessage = "Ready";
    
    function Loading(state) {
        var loadEl = document.getElementById("loader");
        loadEl.innerHTML = "<p span style='color:#ffffff'> Game state: " + state;
        console.log(state);
    };
    Loading(loadingMessage);
    console.log("\n\n" +
                "███████╗██████╗  █████╗  ██████╗███████╗" + '\n' +       
                "██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝" + '\n' +         
                "███████╗██████╔╝███████║██║     █████╗" + '\n' +          
                "╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝" + '\n' +      
                "███████║██║     ██║  ██║╚██████╗███████╗" + '\n' +  
                "╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝" + '\n' +                       
                                                         
                "██╗███╗   ██╗██╗   ██╗ █████╗ ██████╗ ███████╗██████╗ ███████╗" + '\n' +
                "██║████╗  ██║██║   ██║██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝" + '\n' +
                "██║██╔██╗ ██║██║   ██║███████║██║  ██║█████╗  ██████╔╝████████╗" + '\n' +
                "██║██║╚██╗██║╚██╗ ██╔╝██╔══██║██║  ██║██╔══╝  ██╔═══██╗╚════██║" + '\n' +
                "██║██║ ╚████║ ╚████╔╝ ██║  ██║██████╔╝███████╗██║   ██║███████║" + '\n' +
                "╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝" + '\n\n'
                                                              )
    console.log("+ Code, Sound, Design by Bram Lobbens, 2016" + '\n' +
                "+ Find out more @ " + "https://github.com/BramLobbens/spaceinvaders" + '\n' +
                "++ Original game code by Mary Rose Cook @ " + "https://2014.front-trends.com" + '\n' +
                "++ Starfield concept by Dave Kerr @ " +
                "https://www.codeproject.com/" +
                '\n\n')
    
    
    var Game = function(canvasId) {
        var canvas = document.getElementById(canvasId);
        var ctx = canvas.getContext('2d');
        var gameSize = { x: canvas.width, y: canvas.height };
        
        this.bodies = [new Player(this, gameSize)];
        
        var _this = this;
        var tick = function() {
            _this.update();
            _this.draw(ctx, gameSize);
            requestAnimationFrame(tick);
            //console.log("tick test");
        };
        tick();
    };
    
    Game.prototype = {
        update: function() {
            //var bodies = this.bodies;
            // bodies needs to be updated for keyboard movement
            for (var i=0; i<this.bodies.length; i++) {
                this.bodies[i].update();
            }
        },
        
        draw: function(ctx, gameSize) {
            ctx.fillRect(30, 30, 40, 50);
            ctx.clearRect(0, 0, gameSize.x, gameSize.y);
            for (var i = 0; i < this.bodies.length; i++) {
                drawPlayer(ctx, this.bodies[i]);
            }
        }
    }
    
    var Player = function(game, gameSize) {
        this.game = game;
        this.size = { x: 50, y: 50 };
        this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.x };
        this.keyboarder = new Keyboarder();
    };
    
    Player.prototype = {
        update: function() {
            // Default test
            //this.center.x;
            //this.center.y;
            
            //console.log('keyboard test');
            if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
                this.center.x -= 4;
            } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
                this.center.x += 4;
            }
        }
    };
    
    // Player Sprite
    var playerReady = false;
    var playerSprite = new Image();
    playerSprite.onload = function() {
        playerReady = true;
    };
    playerSprite.src = "assets/sprites/player.png";
    
    var drawPlayer = function(ctx, body) {
        // Default test square
        //ctx.fillRect(body.center.x - body.size.x / 2,
        //               body.center.y - body.size.y / 2,
        //               body.size.x, body.size.y);
        //ctx.fillStyle = '#00FF08'
        
        // Draw player sprite
        ctx.drawImage(playerSprite, 
                      body.center.x - body.size.x / 2, 
                      body.center.y - body.size.y / 2,
                      body.size.x,
                      body.size.y)
    };
    
    var Keyboarder = function() {
        var keyState = {};
        
        window.onkeydown = function(e) {
            keyState[e.keyCode] = true;
        };
        
        window.onkeyup = function(e) {
            keyState[e.keyCode] = false;
        };
        
        this.isDown = function(keyCode) {
            return keyState[keyCode] === true;
        };
        
        this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
    };
    
    window.onload = function() {
        new Game("game-screen");
        Loading(loadedMessage);
    }
})();