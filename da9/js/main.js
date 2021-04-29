import "./phaser.js";

var score = 0;
var scoreText;

class MyScene extends Phaser.Scene {

    constructor() {
        super();

    }

    preload() {
        this.load.image('map', 'assets/layout.png');
        this.load.image('agent', 'assets/unnamed.png');
        this.load.image('spy', 'assets/spy.png');
        this.load.audio('music', 'assets/music.mp3');
        this.load.image('trophy', 'assets/trophy.png')
        this.load.image('wall', 'assets/wall.JPG')
        this.load.image('wall2', 'assets/wall2.png')
        this.load.image('wall3', 'assets/wall3.JPG')
        this.load.image('wall4', 'assets/wall4.JPG')
        this.load.image('wall5', 'assets/wall5.JPG')
        this.load.image('tele', 'assets/teleporter.JPG')
    }

    create() {
        let sound = this.sound.add('music').setLoop(true).setVolume(0.1);
        sound.play();


        this.cameras.main.setBounds(0, 0, 800, 608);

        this.add.image(0, 0, 'map').setOrigin(0).setScrollFactor(1);

        scoreText = this.add.text(10, 10, 'score: 0', {fontFamily: 'Arial', fontSize: '12px', fill: '#fff' });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.agent = this.physics.add.image(20, 570, 'agent').setCollideWorldBounds(true).setScale(0.1).setDepth(1);

        this.cameras.main.startFollow(this.agent, true, 0.3, 0.3);
        //this.cameras.main.setZoom(3);

        var platforms = this.physics.add.staticGroup();
        platforms.create(233, 310, 'wall');
        platforms.create(100, 310, 'wall');
        platforms.create(600, 534, 'wall');
        platforms.create(570, 394, 'wall');
        platforms.create(452, 494, 'wall2');
        platforms.create(487, 554, 'wall');
        platforms.create(167, 580, 'wall3');
        platforms.create(424, 380, 'wall4');
        platforms.create(0, 158, 'wall5');
        platforms.create(200, 158, 'wall5');
        platforms.create(400, 158, 'wall5');
        platforms.create(600, 158, 'wall5');
        platforms.create(800, 158, 'wall5');
        this.physics.add.collider(this.agent, platforms, (agent, platforms) => {
            agent.x = agent.x;
            agent.y = agent.y;
        });

        var teleporter = this.physics.add.staticGroup();
        teleporter.create(54, 263, 'tele');
        this.physics.add.collider(this.agent, teleporter, (agent, teleporter) => {
            agent.x = agent.x-44;
            agent.y = agent.y-180;
        });
        var teleporter2 = this.physics.add.staticGroup();
        teleporter2.create(703, 111, 'tele');
        this.physics.add.collider(this.agent, teleporter2, (agent, teleporter2) => {
            agent.x = 20;
            agent.y = 570;
        });


        var spy = this.physics.add.staticGroup();
        var p1 = spy.create(200, 538, 'spy');
        var p2 = spy.create(320, 528, 'spy');
        var p3 = spy.create(490, 368, 'spy');
        var p4 = spy.create(250, 280, 'spy');
        //var p5 = spy.create(150, 400, 'spy');
        var p6 = spy.create(320, 100, 'trophy').setScale(1.5);
        this.physics.add.collider(this.agent, spy, (agent, spy) => {
            spy.destroy();
            score += 1;
        });


    }
    update() {
        this.agent.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.agent.resetFlip();
            this.agent.setVelocityX(-150);
        }
        else if (this.cursors.right.isDown)
        {
            this.agent.flipX = true;
            this.agent.setVelocityX(200);
        }

        if (this.cursors.up.isDown)
        {
            this.agent.setAngle(0).setVelocityY(-200);

        }
        else if (this.cursors.down.isDown)
        {
            this.agent.setVelocityY(200);
        }
        const x = this.agent.x;
        const y = this.agent.y;
        if(score >= 5){
          scoreText.x = x - 100;
          scoreText.y = y - 80;
          scoreText.setText('You defeated them all. You win!')
          // game.sound.mute = true;
          // this.scene.pause();
        }
        else{

          scoreText.x = x + 30;
          scoreText.y = y - 100;
          scoreText.text = `Score: ${score}`;
        }

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
