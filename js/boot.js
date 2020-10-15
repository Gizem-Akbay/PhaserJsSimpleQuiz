var Game = Game || {};
Game.Boot = function () {
}

Game.Boot.prototype = {
    init: function () {
    },
    preload: function () {
        this.load.image('bg', './assets/bg.jpg');
        this.load.image('quest', './assets/quest.png');
        this.load.image('option', './assets/option.png');
        this.load.image('fullScreen', './assets/fullScreen.png');
        this.load.image('fullScreenExit', './assets/fullScreenExit.png');
        this.load.json('questions', './data/questions.json');
    },
    create: function () {
        this.game.stage.backgroundColor = '#ffffff';
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.minWidth = 240;
        this.scale.minHeight = 170;
        this.scale.maxWidth = 2880;
        this.scale.maxHeight = 1920;
        this.state.start('intro');
    }
}