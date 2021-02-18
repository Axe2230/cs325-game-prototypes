import "./phaser.js";

var player;
var stars;
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
    this.load.image('sky', 'assets/sky4.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', './assets/coin1.png');
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
    gameOverText = this.add.text(400,250, 'Game Over', { font: '32px Courier', fill: '#FF0000' });
    gameOverText.setOrigin(0.5)
    gameOverText.visible = false

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
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

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    scoreText = this.add.text(15, 45, 'Score: 0', { fontSize: '32px Courier', fill: '#FF0000' });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    /*this.physics.add.collider(player, stars, function (player, star) {
        gemSound.play();

    });*/

    this.physics.add.overlap(player, stars, collectStar, null, this);
}

  update() {
    info.setText('Time Left: ' + (Math.floor(20000 - timer.getElapsed()))/1000);
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
    if(score > 110){
      gameOverText.setText("You Won!");
      gameOverText.visible = true;
      game.sound.mute = true;
      this.scene.pause();
    }
  }
  gameOver ()
  {
      //this.input.off('gameobjectup');
      //this.add.image(400, 300, 'gameoverimg');
      gameOverText.setText("GAME OVER!");
      gameOverText.visible = true
      game.sound.mute = true;
      this.scene.pause();
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

  const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'game',
      width: 800,
      height: 600,
      scene: MyScene,
      // Code from http://phaser.io/tutorials/making-your-first-phaser-3-game/part3
      physics: { default: 'arcade',
  	    arcade: {
              gravity: { y: 300 },
              debug: false
          } },
  });
