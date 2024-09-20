import { CONSTANTS } from './config.js';

export class PipeManager {
    constructor(scene) {
        this.scene = scene;
        this.group = scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });
    }

    spawnPipe() {
        const hole = Math.floor(Math.random() * (8 - CONSTANTS.GAP_SIZE / 64)) + 1;

        for (let i = 0; i < 8; i++) {
            if (i < hole || i >= hole + CONSTANTS.GAP_SIZE / 64) {
                const pipe = this.group.create(this.scene.game.config.width, i * 64 + 32, 'pipe');
                pipe.setScale(0.5, 1);
                pipe.setVelocityX(CONSTANTS.PIPE_VELOCITY);
            }
        }

        return true;
    }

    resetPipes() {
        this.group.clear(true, true); 
    }
}
