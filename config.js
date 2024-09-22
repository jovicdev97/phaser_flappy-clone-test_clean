export const CONFIG = {
    type: Phaser.AUTO,
    width: 288,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

export const CONSTANTS = {
    PIPE_SPAWN_INTERVAL: 1700,
    BIRD_FLAP_VELOCITY: -150,
    PIPE_VELOCITY: -200,
    GAP_SIZE: 175
};

export function loadConfigFromJson(json) {
    if (json.pipes && json.bird) {
        Object.assign(CONSTANTS, {
            PIPE_SPAWN_INTERVAL: json.pipes.spawnInterval,
            BIRD_FLAP_VELOCITY: json.bird.flapVelocity,
            PIPE_VELOCITY: json.pipes.velocity,
            GAP_SIZE: json.pipes.gapSize,
        });
    }
}
