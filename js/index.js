var Game = Game || {};

Game.W = window.innerWidth;
Game.H = window.innerHeight;

Game.game = new Phaser.Game(Game.W, Game.H, Phaser.AUTO, 'core');
Game.game.state.add('boot', Game.Boot);
Game.game.state.add('intro', Game.Intro);
Game.game.state.add('question', Game.Question);
Game.game.state.start('boot');
