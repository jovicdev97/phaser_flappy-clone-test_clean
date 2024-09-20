import { CONFIG } from './config.js';
import { GameScene } from './GameScene.js';

function createGame() {
    const game = new Phaser.Game(CONFIG);
    game.scene.add('GameScene', GameScene, true);
    return game;
}

document.addEventListener('DOMContentLoaded', () => {
    createGame();
});
