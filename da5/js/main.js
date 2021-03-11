import "./phaser.js";

var player;
var stars;
var ball;
var ball2;
var ball3;
var ball4;
var ball5;
var platforms;
var cursors;
var score = 0;
var music;
var scoreText;
let timer;
let info;
let gameOverText;

class MyScene extends Phaser.Scene {

  constructor() {
    super();
    this.flag = null;
  }

  preload() {
    this.load.image('sky', 'assets/gym.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', './assets/ball1.png');
    this.load.image('star2', './assets/ball1.png');
    this.load.image('star3', './assets/ball1.png');
    this.load.image('star4', './assets/ball1.png');
    this.load.image('star5', './assets/ball1.png');
    //this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 34 });
    this.load.audio('gemAudio', ['./assets/music.mp3']);

/*    this.load.audio('gemAudio', ['./assets/gem.mp3']);
*/}

  create() {
    this.add.image(400, 300, 'sky');

    music = this.sound.add('gemAudio', { volume: 0.70 });
    music.loop = true;
    music.play();
    /*this.physics.add.collider(this.dude, this.star, function (dude, star) {
        gemAudio.play();
    });*/
    info = this.add.text(10, 10, '', { font: '38px Courier', fill: '#00ff00' });
    timer = this.time.addEvent({ delay: 20000, callback: this.gameOver, callbackScope: this }); //20 second timer
    gameOverText = this.add.text(400,250, 'Game Over', { font: '48px Courier', fill: '#FF0000' });
    gameOverText.setOrigin(0.5)
    gameOverText.visible = false

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 600, 'ground').setScale(2).refreshBody();

    // platforms.create(600, 400, 'ground');
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.body.gravity.y = 300;
    //player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    // stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 11,
    //     setXY: { x: 12, y: 0, stepX: 70 }
    // });

    ball = this.physics.add.image(700, 500, 'star');
    ball.body.allowGravity = false;
    ball.setVelocityX(-80, 10);
    ball.setVelocityY(0);
    ball.setInteractive();
    //ball.setCollideWorldBounds(true);

    ball2 = this.physics.add.image(700, 550, 'star2');
    ball2.body.allowGravity = false;
    ball2.setVelocityX(-150, 10);
    ball2.setVelocityY(0);
    ball2.setInteractive();
    //ball2.setCollideWorldBounds(true);

    ball3 = this.physics.add.image(700, 400, 'star3');
    ball3.body.allowGravity = false;
    ball3.setVelocityX(-50, 10);
    ball3.setVelocityY(0);
    ball3.setInteractive();
    //ball3.setCollideWorldBounds(true);

    ball4 = this.physics.add.image(700, 500, 'star4');
    ball4.body.allowGravity = false;
    ball4.setVelocityX(-280, 10);
    ball4.setVelocityY(0);
    ball4.setInteractive();
    //ball4.setCollideWorldBounds(true);

    ball5 = this.physics.add.image(700, 480, 'star5');
    ball5.body.allowGravity = false;
    ball5.setVelocityX(-150, 10);
    ball5.setVelocityY(0);
    ball5.setInteractive();
    //ball5.setCollideWorldBounds(true);


    this.physics.world.setBoundsCollision();
    //ball.velocity.x = -50;

    //ball = this.add.image(700, 500, 'star');
    //ball.setInteractive();


    // stars.children.iterate(function (child) {
    //
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //     child.body.gravity.y = 300;
    //
    // });

    //scoreText = this.add.text(15, 45, 'Score: 0', { fontSize: '32px Courier', fill: '#FF0000' });

    this.physics.add.collider(player, platforms);
    // this.physics.add.collider(stars, platforms);
    this.physics.add.collider(ball, platforms);
    /*this.physics.add.collider(player, stars, function (player, star) {
        gemSound.play();

    });*/

    //this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.overlap(player, ball, checkHit, null, this);
    this.physics.add.overlap(player, ball2, checkHit, null, this);
    this.physics.add.overlap(player, ball3, checkHit, null, this);
    this.physics.add.overlap(player, ball4, checkHit, null, this);
    this.physics.add.overlap(player, ball5, checkHit, null, this);
}

  update() {
    if(ball.x <= 2){
      var randomX = Phaser.Math.Between(750, 900);
      var randomY = Phaser.Math.Between(400, 550);
      var randomVelo = Phaser.Math.Between(-150, -300);
      ball.x = randomX;
      ball.y = randomY;
      ball.setVelocityX(randomVelo);
      ball.setVelocityY(0);
    }
    if(ball2.x <= 20){
      var randomX = Phaser.Math.Between(750, 900);
      var randomY = Phaser.Math.Between(400, 550);
      var randomVelo = Phaser.Math.Between(-150, -300);
      ball2.x = randomX;
      ball2.y = randomY;
      ball2.setVelocityX(randomVelo);
      ball2.setVelocityY(0);
    }
    if(ball3.x <= 1){
      var randomX = Phaser.Math.Between(750, 900);
      var randomY = Phaser.Math.Between(400, 550);
      var randomVelo = Phaser.Math.Between(-150, -300);
      ball3.x = randomX;
      ball3.y = randomY;
      ball3.setVelocityX(randomVelo);
      ball3.setVelocityY(0);
    }
    if(ball4.x <= 10){
      var randomX = Phaser.Math.Between(750, 900);
      var randomY = Phaser.Math.Between(400, 550);
      var randomVelo = Phaser.Math.Between(-150, -300);
      ball4.x = randomX;
      ball4.y = randomY;
      ball4.setVelocityX(randomVelo);
      ball4.setVelocityY(0);
    }
    if(ball5.x <= 0){
      var randomX = Phaser.Math.Between(750, 900);
      var randomY = Phaser.Math.Between(400, 550);
      var randomVelo = Phaser.Math.Between(-150, -300);
      ball5.x = randomX;
      ball5.y = randomY;
      ball4.setVelocityX(randomVelo);
      ball4.setVelocityY(0);
    }
    score = Math.ceil((timer.getElapsed())/1000);
    info.setText('Score: ' + score);
    //ball.x -= 0.5;
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('left', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
    if(cursors.down.isDown){
      player.setVelocityY(360);
      //player.anims.play('left', true);
    }
    if(score > 110){
      gameOverText.setText("You Won!");
      gameOverText.visible = true;
      game.sound.mute = true;
      this.scene.pause();
    }
  }
  resetPositionCheck(){
    if(ball.x <= 20){
      var randomX = Phaser.Math.Between(750, 900);
      var randomY = Phaser.Math.Between(400, 550);
      ball.x = randomX;
      ball.y = randomY;
    }
    if(ball2.x <= 20){
      var randomX = Phaser.Math.Between(750, 900);
      var randomY = Phaser.Math.Between(400, 550);
      ball2.x = randomX;
      ball2.y = randomY;
    }
    if(ball3.x <= 20){
      var randomX = Phaser.Math.Between(750, 900);
      var randomY = Phaser.Math.Between(400, 550);
      ball3.x = randomX;
      ball3.y = randomY;
    }
    if(ball4.x <= 20){
      var randomX = Phaser.Math.Between(750, 900);
      var randomY = Phaser.Math.Between(400, 550);
      ball4.x = randomX;
      ball4.y = randomY;
    }
    if(ball5.x <= 20){
      var randomX = Phaser.Math.Between(750, 900);
      var randomY = Phaser.Math.Between(400, 550);
      ball5.x = randomX;
      ball5.y = randomY;
    }
  }
  gameOver ()
  {
      //this.input.off('gameobjectup');
      //this.add.image(400, 300, 'gameoverimg');
      // gameOverText.setText("GAME OVER!");
      // gameOverText.visible = true
      // game.sound.mute = true;
      // this.scene.pause();
  }
} //constructor
function collectStar(player, star) {
    star.disableBody(true, true);
/*    music = this.add.audio('gemAudio');
    music.play();*/

    //let soundSample = this.sound.add('gemAudio');
    //soundSample.play();
    score += 10;
    scoreText.setText('Score: ' + score);
  }
  function checkHit(player, ball){
    gameOverText.setText("Game Over!");
    gameOverText.visible = true;
    //ball.disableBody(true, true);
    game.sound.mute = true;
    this.scene.pause();
  }

  const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'game',
      width: 800,
      height: 600,
      scene: MyScene,
      // Code from http://phaser.io/tutorials/making-your-first-phaser-3-game/part3
      physics: { default: 'arcade',
  	    arcade: {
              //gravity: { y: 300 },
              debug: false
          } },
  });
