var Game = Game || {};
Game.Question = function () {
}

Game.Question.prototype = {
    init:function(){
        var bg = this.add.image(0, 0, 'bg');
        bg.x = 0;
        bg.y = 0;
        bg.height = this.game.height;
        bg.width = this.game.width;
    },
    preload:function(){
    },
    shuffle: function (array) {
      array.sort(() => Math.random() - 0.5);
      return array;
    },
    create:function(){
        var data = this.game.cache.getJSON('questions');
        this.rectCanvas = Game.Utils.getRectCanvas();
        this.data = data;
        this.answered = {};

        var questions = this.shuffle(data.questions);

        questions.forEach((q, i) => {
            var y = ((i + 1) * 100);
            var imageQuestion = this.showImageBackground(0, y);
            var questionItem = q;
            this.showQuestionIndex(i, 40, (y + 25))
            this.showQuestion(questionItem, imageQuestion, 120, (y + 25));
        });
        this.showFullScreenButton();
    },
    showQuestionIndex:function(i, x, y){
        this.addQuestionTitle(i + 1, x, y);
    },
    showQuestion:function(questionItem,imageQuestion, x, y){
        this.addQuestionTitle(questionItem.question, x, y);
        this.addButtonsChoice(questionItem, imageQuestion, questionItem.choices, questionItem.answer, y);
    },
    addQuestionTitle:function(textContent,x, y){
        var questionTitleElement = this.game.add.text(-100,y,textContent, {
            font: "20pt Audiowide", 
            fill: "#000000", 
            wordWrap: true,  
            wordWrapWidth:1600,
            align: "left", 
        });
        questionTitleElement.alpha = 0.1;
        this.game.add.tween(questionTitleElement).to( { 'x': x, 'alpha': 1 }, 1000, "Linear", true);
    },
    addButtonsChoice:function(questionItem, imageQuestion, choicesText,answerIndex,y){
        var groupButtons = this.game.add.group();
        var previousGroup;
        var x = imageQuestion.x + imageQuestion.width;
        for(var index = 0; index < choicesText.length; index++) {
            var isRightAnswer = (index===answerIndex);
            this.addChoiceGroup(questionItem,choicesText[index],isRightAnswer,(x + (index * 150)), y - 26);
        }
    },
    addChoiceGroup:function(questionItem, title,isRightAnswer,x, y){
        var image_button = this.game.add.button(x,y, 'option', this.onButtonChoiceClicked, {"context":this,isRightAnswer:isRightAnswer, "question": questionItem}, 2, 1, 0);
        var text = this.game.add.text(x + 40, y + 24, title, {font: "20pt Audiowide", fill: "#000000", wordWrap: false,  align: "left"});
    },
    onButtonChoiceClicked:function(ev){
        var context = this.context;
        if (context.answered[this.question.index] === undefined) {
            if(this.isRightAnswer){
                ev.tint = 0x00ff00;
            }else{
                ev.tint = 0xff0000;
            }
            context.answered[this.question.index] = this.isRightAnswer;
        }
    },
    listQuestions:function(){
        return this.data.questions;
    },
    getQuestionItem(questionIndex){
        return this.data.questions[questionIndex];
    },
    showImageBackground: function(x, y){
        var image_question = this.game.add.image(x,y, 'quest');
        var scale = 1;

        var max_width = (this.game.width * 75) / 100;

        if(image_question.width > max_width) {
            scale = max_width / image_question.width;
        }

        image_question.scale.set(scale);
        return image_question;
    },
    showExitButton:function(){
        var button = this.game.add.button(0,0, 'option', this.onButtonExitClicked, this, 2, 1, 0);
        button.alignIn(this.rectCanvas,Phaser.BOTTOM_RIGHT);
    },
    showFullScreenButton: function () {
        var is_full_screen = this.game.scale.isFullScreen;
        var button = this.game.add.button(this.game.width - 300, 15, (is_full_screen ? 'fullScreenExit' : 'fullScreen'), this.changeFullScreen, this, 2, 1, 0);
        button.scale.setTo(0.8, 0.8);
    },
    onButtonExitClicked:function(){
        this.game.state.start('intro');
    },
    changeFullScreen: function () {
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen(false);
        }
        var vm = this;
        setTimeout(() => {
            vm.showFullScreenButton();
        }, 500);
    }
}