import "./phaser.js";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class
var first = true;
let info;
let timer;
let alive = 0;
var box;
var newBox;
var randX = Phaser.Math.Between(-2, 2);
var randY = Phaser.Math.Between(-2, 2);
class MyScene extends Phaser.Scene {

    constructor() {
        super();

    }

    preload() {
        //this.load.image('bg', 'assets/sky4.png');

        this.load.image('bg', 'assets/speed.gif');
        this.load.image('crate', 'assets/target.png');
        this.load.image('gameoverimg', 'assets/gameover.png');
        this.load.audio('shot', ['assets/shot.mp3']);
    }

    create() {
      //  How many crates can you click on in 10 seconds?
          this.add.image(400, 300, 'bg');

            //  Create a bunch of images
      //for (var i = 0; i < 64; i++)
      //{
          var x = Phaser.Math.Between(0, 800);
          var y = Phaser.Math.Between(0, 600);

          box = this.add.image(x, y, 'crate');
          //box.setScale(0.5); //reduce box width and height by 50%
          var shot = this.sound.add('shot');
          this.input.on('pointerdown', function () {
              shot.play();
        });
          //  Make them all input enabled
          box.setInteractive();

          //  The images will dispatch a 'clicked' event when they are clicked on
          box.on('clicked', this.clickHandler, this);


      //}
            //  If a Game Object is clicked on, this event is fired.
      //  We can use it to emit the 'clicked' event on the game object itself.
      this.input.on('gameobjectup', function (pointer, gameObject)
      {
          gameObject.emit('clicked', gameObject);
          gameObject.emit('down', gameObject);
          //gameObject.emit('againclick', gameObject);
      }, this);

      //  Display the game stats
        info = this.add.text(10, 10, '', { font: '48px Courier', fill: '#00ff00' });
        timer = this.time.addEvent({ delay: 20000, callback: this.gameOver, callbackScope: this });

        this.gameOverText = this.add.text(400,250, 'Game Over', { font: '48px Courier', fill: '#FF0000' });
        this.gameOverText.setOrigin(0.5)
        this.gameOverText.visible = false

        this.playAgain = this.add.text(400, 300, 'Play Again?',{ font: '48px Courier', fill: '#0000FF' });
        this.playAgain.setOrigin(0.5)
        this.playAgain.visible = false
        this.playAgain.setInteractive();
        //playAgain.setInteractive();
      //  playAgain.on('againclick', this.playAgainClick, this);




    }

    update() {
      info.setText('Targets Hit: ' + alive + '\nTime Left: ' + (Math.floor(20000 - timer.getElapsed()))/1000);

      //console.log(Math.floor(timer.getElapsed()));
      if(newBox !== undefined && this.gameOverText.visible!== true){
        if((newBox.x < 20) || (newBox.x > 780) || (newBox.y < 30) || (newBox.y > 580)){
          if(newBox.x < 20){
            newBox.x += Math.abs(randX);
          }
          if(newBox.x > 780){
            if(randX > 0){
              newBox.x += -1 * randX;
            }
          }
          if(newBox.y < 30){
            newBox.y += Math.abs(randY);
          }
          if(newBox.y > 580){
            if(randY > 0){
              newBox.y += -1 * randY;
            }
          }
      }
      else{
        newBox.x += randX;
        newBox.y+=-randY;
      }
        if((Math.round(timer.getElapsed()/100)*100 % 1000 === 0)){
          randX = Phaser.Math.Between(-2, 2);
          randY = Phaser.Math.Between(-2,2);
          console.log(randX, randY);
          newBox.x += randX;
          newBox.y+= randY;
          first = false;
        }

      }
      ///box.setOrigin(box.x+3, box.y);
    }
  clickHandler (box)
    {
        alive++;
        //box.play();
        box.off('clicked', this.clickHandler);
        box.input.enabled = false;
        box.setVisible(false);

        var x = Phaser.Math.Between(0, 800);
        var y = Phaser.Math.Between(0, 600);

        newBox = this.add.image(x, y, 'crate');
        //console.log(newBox.x, newBox.y);
        //  Make them all input enabled
        newBox.setInteractive();

        //  The images will dispatch a 'clicked' event when they are clicked on
        newBox.on('clicked', this.clickHandler, this);
    }

    gameOver ()
    {
        this.input.off('gameobjectup');
        //this.add.image(400, 300, 'gameoverimg');
        this.gameOverText.visible = true
        //this.playAgain.visible = true
        this.playAgain.on('down', function () {
    // this here refers to this.startText, so you can do e.g. this.setText("new text");
        this.gameOverText.visible = false
        this.playAgain.visible = false
})
        this.score = this.add.text(400, 350, 'AVG Targets/Sec: '+ alive/20.0,{ font: '48px Courier', fill: '#0000FF' });
        this.score.setOrigin(0.5)
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
