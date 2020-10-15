var Game = Game || {};

Game.Intro = function () {
}

Game.Intro.prototype = {
    preload: function () {
    },
    create: function () {
        this.add.image(0, 0, 'bg');
        var rectCanvas = Game.Utils.getRectCanvas();
        var intoGroup = this.game.add.group();
        var buttonsGroup = this.createButtons();
        var textGroup = this.createTextHeaders();
        buttonsGroup.alignTo(textGroup,Phaser.BOTTOM_CENTER);
        intoGroup.add(buttonsGroup)
        intoGroup.add(textGroup)
        intoGroup.alignIn(rectCanvas,Phaser.CENTER);
    },
    createButtons:function(){
        this.groupButtons = this.game.add.group();
        this.createStartButton();
        return this.groupButtons;
    },
    createStartButton: function () {
        var context = { game:this.game};
        var button = this.game.add.button(0, 0, 'option', this.onButtonStart, context, 2, 1, 0);
        var text = this.game.add.text(45,25,"Start", {
                    font: "20pt Audiowide", 
                    fill: "#000000", 
                    wordWrap: true,
                    align: "left", 
                });
        this.groupButtons.add(button);
        this.groupButtons.add(text);
    },
    onButtonStart: function () {
        this.game.state.start('question',true,false,0);
    },
    createTextHeaders:function(){
        var previous;
        var texts = ['Willkommen!'];
        var group = this.game.add.group();
        var that = this;
        texts.forEach( function(text){
            var textEl = that.createText(text);
            if(previous){
                textEl.alignTo(previous,Phaser.BOTTOM_CENTER);
            }
            previous = textEl;
            group.add(textEl);
        });
        return group;
    },
    createText:function(textContent){
        var style = this.getStyle();
        style.font = 'Audiowide';
        style.fontSize = '38pt';
        style.fill= '#000000';
        return this.game.add.text(0,0,textContent, style);
    },
    getStyle:function(){
        return { 
            font: "38pt Arial", fill: "#000000", wordWrap: false,  align: "left", backgroundColor:'#FFFFFF' };
    }
}