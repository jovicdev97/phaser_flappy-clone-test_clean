import { CONSTANTS } from './config.js';

export class Bird extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bird');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);
        this.setCollideWorldBounds(true);
    }

    flap() {
        this.setVelocityY(CONSTANTS.BIRD_FLAP_VELOCITY);
        this.angle = -15;
    }

    update() {
        if (this.body.velocity.y > 0 && this.angle < 90) {
            this.angle += 2;
        }
    }

    resetPosition() {
        this.setPosition(50, this.scene.game.config.height / 2);
        this.setVelocityY(0);
        this.angle = 0;
    }
}
