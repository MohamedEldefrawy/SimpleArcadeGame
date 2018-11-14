// player step and boundries
var maxX = 400;
var maxY = 370;
var minX = 0;
var minY = 0;
var horizontalStep = 100;
var verticalStep = 80;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 500 || this.x < -90) {
        this.x = 0;
    }

    // Check Collision between player and enemies
    if (player.y == this.y && player.x == (this.x + 10)) {
        Reset();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // checkCollisions(player, allEnemies);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Game world boundries after trying some numbers:-
// (min,max) => x(0,400) y(-25,375)
Player.prototype.handleInput = function(key) {



    // moving the player and prevent it from getting outside the game world
    if (key == 'left' && player.x > minX) {
        player.x -= horizontalStep;

    } else if (key == 'right' && player.x < maxX) {
        player.x += horizontalStep;

    } else if (key == 'up' && player.y > minY) {
        player.y -= verticalStep;

    } else if (key == 'down' && player.y < maxY) {
        player.y += verticalStep;
    }


    // Check if won the game and resetting the game
    if (player.y <= minY) {
        setTimeout(function() {
            player.x = 200;
            player.y = maxX;
        }, 2000)
    }

};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// allowed y-axis for the Enemy
var enemyYaxis = [50, 130, 210, 290];

for (var i = 0; i < enemyYaxis.length; i++) {
    allEnemies.push(new Enemy(-90, enemyYaxis[i], Math.floor(Math.random() * 200) + 50));
}

// allEnemies.push(new Enemy(-90, 290, randomEnemySpeed));
var player = new Player(200, maxY);

function Reset() {
    player.x = 200;
    player.y = maxY;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});