

var TalkScene = Class.create(BaseScene, {
	"initialize" : function(game) {
		BaseScene.call(this, game);
		var self = this;
		
		this.backgroundColor  = 'rgba(0,0,0,0.5)';
		
		var text = new enchant.Entity();
		text.width = game.width - 4 * 2 - 8 - 110;
		text.height = 48 - 8;
		text.x = 4;
		text.y = game.height - 48 - 4;
		text._element = document.createElement('textarea');
		text._element.type = 'text';
		text._element.name = 'hoge';
		text._element.style.padding = '4px';
		text._element.placeholder = '入力したい内容を入力し、送信ボタンを押してください。';
		//text._element.style.width = (input.width - 8) + "px";
		//text._element.style.height = (input.height - 8) + "px";
		this.addChild(text);
		this.text = text;
		
		var submit = new enchant.Entity();
		submit.width = 100;
		submit.height = 48;
		submit.x = text.x + text.width + 8 + 10;
		submit.y = text.y;
		submit._element = document.createElement('input');
		submit._element.type = 'button';
		submit._element.value = '送信';
		submit._element.style.textAlign = 'center';
		submit._element.style.lineHeight = '48px';
		submit._element.style.padding = '0';
		this.addChild(submit);
		this.submit = submit;
		submit._element.onclick = function() {
			self._onsubmit();
		} ;
	} , 
	"_onsubmit" : function() {
		var s = this.text._element.value;	
		console.log(s);
		
		this.popScene();
	}
});
