export class ScoreManager {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.scoreText = this.createScoreText();
        this.restartButton = null;
    }

    createScoreText() {
        return this.scene.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    }

    incrementScore() {
        this.score += 1;
        this.updateScoreText();
    }

    updateScoreText() {
        this.scoreText.setText(`Score: ${this.score}`);
    }

    gameOver() {
        this.displayGameOverText();
        this.createRestartButton();
    }

    displayGameOverText() {
        this.scoreText.setText(`Game Over\nScore: ${this.score}`);
        this.scoreText.setAlign('center');
        this.scoreText.setX(this.scene.game.config.width / 2 - this.scoreText.width / 2);
        this.scoreText.setY(this.scene.game.config.height / 2 - this.scoreText.height / 2);
    }

    createRestartButton() {
        if (!this.restartButton) {
            this.restartButton = this.scene.add.text(
                this.scene.game.config.width / 2,
                this.scene.game.config.height / 2 + 50,
                'Neustart',
                { fontSize: '24px', fill: '#0f0' }
            ).setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.handleRestart());
        }
    }

    handleRestart() {
        this.scene.scene.restart();
        this.resetScore();
        this.clearRestartButton();
    }

    clearRestartButton() {
        if (this.restartButton) {
            this.restartButton.destroy();
            this.restartButton = null;
        }
    }

    resetScore() {
        this.score = 0;
        this.updateScoreText();
    }
}
