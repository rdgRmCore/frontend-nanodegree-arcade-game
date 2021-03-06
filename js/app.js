"use strict";

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.setInitialPosition();
    this.setInitialSpeed();
};

//set the initial position of an enemy
//enemies can start on one of three different rows
Enemy.prototype.setInitialPosition = function() {
    //pick a row to start
    var row = getRandomInt(1,4);

    //set the y position based on the row
    this.y = (row * 83) - 20;
    this.x = 0;
};

Enemy.prototype.setInitialSpeed = function() {
    this.speed = getRandomInt(30, 151);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt)

    if (this.x > 499){
        this.setInitialPosition();
        this.setInitialSpeed();
    }
    this.detectCollision();
};

//Determine if the enemy touched the player
Enemy.prototype.detectCollision = function() {

    //if the player and enemy are in the smae row there might be a collision
    if ((this.y ) === player.y){
        var enemyRightEdge = this.x + 101;
        var playerRightEdge = player.x + 101;

        //check for over lap between enemy and player x coordinates
        if ((enemyRightEdge >= player.x) && 
            (enemyRightEdge <= playerRightEdge)){
            //enemy has hit player from the right
            player.setInitialPosition();
        } else if ((playerRightEdge >= this.x) &&
                  (this.x > player.x )){
            //player has tried to step on enemy
            player.setInitialPosition();
        } 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Our player
var Player = function() {
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
    this.setInitialPosition();
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

    //if player reaches the water, set player to starting position
    if (this.y < 63){
        this.setInitialPosition();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Have the player respond to key presses
Player.prototype.handleInput = function (keyCode){
    console.log (keyCode);
  
    if ('up' === keyCode) {
        if (this.y == 415){
            this.y = this.y - 103;
        } else if (this.y > 60){
            this.y = this.y - 83;
        }
    } else if ('down' === keyCode) {
        if (this.y < 329){
            this.y = this.y + 83;
        }
    } else if ('left' === keyCode) {
        if (this.x > 99){
            this.x = this.x - 101;
        }
    } else if ('right' === keyCode) {
        if (this.x < 304){
            this.x = this.x + 101;
        }
    } 
  
};

Player.prototype.setInitialPosition = function (){
    this.x = 202;
    this.y = 415;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var i = 0;
for (i = 0; i < 4; i++){
    allEnemies[i] = new Enemy();
};

// Place the player object in a variable called player
var player = new Player();

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

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
