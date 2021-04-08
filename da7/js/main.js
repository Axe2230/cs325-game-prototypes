import "./phaser.js";

let info;
let info2;
let score1 = 0;
let score2 = 0;


var Breakout = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Breakout ()
    {
        Phaser.Scene.call(this, { key: 'breakout' });

        this.bricks;
        this.paddle;
        this.paddle2;
        this.ball;
    },

    preload: function ()
    {
        this.load.atlas('assets', 'assets/breakout.png', 'assets/breakout.json');
        this.load.image('bg', 'assets/bg.png');
    },

    create: function ()
    {
        this.add.image(400, 300, 'bg');
        info = this.add.text(10, 10, '', { font: '38px Courier', fill: '#008000' });
        info2 = this.add.text(600, 550, '', { font: '38px Courier', fill: '#1E90FF' });
        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        //  Create the bricks in a 10x6 grid
        // this.bricks = this.physics.add.staticGroup({
        //     key: 'assets', frame: [ 'blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1' ],
        //     frameQuantity: 10,
        //     gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        // });

        this.ball = this.physics.add.image(400, 500, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true);

        this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1').setImmovable();
        this.paddle2 = this.physics.add.image(400, 50, 'assets', 'paddle2').setImmovable();
        //  Our colliders
        //this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.paddle2, this.hitPaddle, null, this);

        //  Input events
        this.input.on('pointermove', function (pointer) {

            //  Keep the paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

            if (this.ball.getData('onPaddle'))
            {
                this.ball.x = this.paddle.x;
            }

        }, this);

        this.input.keyboard.on('keydown-A', function(pointer) {
          if(this.paddle2.x > 55){
            this.paddle2.x = this.paddle2.x - 24;
        }
        }, this);

        this.input.keyboard.on('keydown-D', function(pointer) {
          if(this.paddle2.x < 740){
          this.paddle2.x = this.paddle2.x + 24;
        }
        }, this);



        this.input.on('pointerup', function (pointer) {

            if (this.ball.getData('onPaddle'))
            {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('onPaddle', false);
            }

        }, this);
    },

    hitBrick: function (ball, brick)
    {
        brick.disableBody(true, true);

        if (this.bricks.countActive() === 0)
        {
            this.resetLevel();
        }
    },

    resetBall: function ()
    {

        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 500);
        this.ball.setData('onPaddle', true);
    },

    resetLevel: function ()
    {
        //this.resetBall();

        // this.bricks.children.each(function (brick) {
        //
        //     brick.enableBody(false, 0, 0, true, true);
        //
        // });
    },

    hitPaddle: function (ball, paddle)
    {
        var diff = 0;

        if (ball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    },

    update: function ()
    {
        if (this.ball.y > 600)
        {
          if(this.ball.x > 250 && this.ball.x < 550){
            this.resetBall();
            score1 = score1 + 1
          }

        }
        if(this.ball.y < 35){

          if(this.ball.x > 250 && this.ball.x < 550){

            this.resetBall();
            score2 = score2 + 1
          }
        }
        info.setText('Score: ' + score1);
        info2.setText('Score: ' + score2);
        // if(keyA.isDown) {
        //    console.log('A key pressed')
        // }
        // else if(keyD.isDown) {
        //    console.log('D key pressed')
        // }
    }

});

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'game',
    scene: [ Breakout ],
    physics: {
        default: 'arcade'
    }
};

var game = new Phaser.Game(config);
