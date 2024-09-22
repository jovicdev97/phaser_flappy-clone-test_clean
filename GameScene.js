import { Bird } from './Bird.js';
import { PipeManager } from './PipeManager.js';
import { ScoreManager } from './ScoreManager.js';
import { CONSTANTS } from './config.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.gameOverFlag = false;
        this.startScreen = null;
        this.startGameFlag = false;
    }

    preload() {
        this.load.image('sky', '../assets/backgrounds/sky.png');
        this.load.image('bird', '../assets/birds/bird_purple.png');
        this.load.image('pipe', '../assets/pipes/pipe_green.png');
    }

    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'sky');
        this.bird = new Bird(this, 50, this.game.config.height / 2);
        this.pipeManager = new PipeManager(this);
        this.scoreManager = new ScoreManager(this);

        this.physics.add.collider(this.bird, this.pipeManager.group, this.gameOver, null, this);
        
        this.input.on('pointerdown', this.flapBird, this);
        this.input.keyboard.on('keydown-SPACE', this.flapBird, this);

        this.pipeTimer = this.time.addEvent({
            delay: CONSTANTS.PIPE_SPAWN_INTERVAL,
            callback: this.handlePipeSpawn,
            callbackScope: this,
            loop: true,
            paused: true 
        });

        this.showStartScreen();
    }

    update() {
        if (!this.gameOverFlag && this.startGameFlag) {
            this.bird.update();
        }
    }

    showStartScreen() {
        this.startScreen = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2,
            'START GAME',
            { fontSize: '24px', fill: '#fff' }
        ).setOrigin(0.5);
    }

    flapBird() {
        if (this.startScreen) {
            this.startScreen.destroy();
            this.startScreen = null;
            this.startGameFlag = true; 
            this.gameOverFlag = false;
            this.pipeManager.resetPipes();
            this.scoreManager.resetScore();
            this.physics.resume();
            this.pipeTimer.paused = false; 
            this.bird.resetPosition();
        } else if (this.gameOverFlag) {
            this.restartGame(); 
        } else {
            this.bird.flap();
        }
    }

    handlePipeSpawn() {
        if (!this.gameOverFlag && this.pipeManager.spawnPipe()) {
            this.scoreManager.incrementScore();
        }
    }

    gameOver() {
        if (!this.gameOverFlag) {
            this.gameOverFlag = true;
            this.physics.pause();
            this.bird.setTint(0xff0000);
            this.scoreManager.gameOver();
            this.pipeTimer.paused = true;
            this.input.off('pointerdown', this.flapBird, this);
        }
    }

    restartGame() {
        this.gameOverFlag = false;
        this.pipeManager.resetPipes();
        this.scoreManager.resetScore();
        this.pipeTimer.paused = false;
        this.bird.resetPosition();
        this.bird.clearTint();
        this.physics.resume();
        this.input.on('pointerdown', this.flapBird, this);
    }
}
