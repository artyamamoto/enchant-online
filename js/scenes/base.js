

var BaseScene = Class.create(Scene, {
	"initialize" : function(game) {
		Scene.call(this);
		this.game = game;
	} , 
	"replaceScene" : function() {
		this.game.replaceScene(this);
		return this;
	} , 
	"pushScene" : function() {
		this.game.pushScene(this);
		return this;
	} , 
	"popScene" : function() {
		this.game.popScene(this);
		return this;
	} , 
	"createText" : function(options) {
		options = extend(options, {
			type : "text", 
			width : 100 , 
			height : 48 , 
			x : 0 , 
			y : 0 ,
			value : "" , 
			placeholder : ''
		});	
		var text = new enchant.Entity();
		text.width = options.width - 4 * 2;
		text.height = options.height - 4 * 2;
		text.x = options.x;
		text.y = options.y;
		text._element = document.createElement(((options.type == "textarea") ? 'textarea': 'input'));
		text._element.type = 'text';
		text._element.name = '';
		text._element.style.padding = '4px';
		text._element.placeholder = options.placeholder;
		//text._element.style.height = (input.height - 8) + "px";
		return text;
	} , 
	"createButton" : function(options) {
		options = extend(options, {
			width : 100 , 
			height : 48 , 
			x : 0 , 
			y : 0 ,
			value : "送信" , 
			onclick : null 
		});	
		var submit = new enchant.Entity();
		submit.width = options.width;
		submit.height = options.height;
		submit.x = options.x;
		submit.y = options.y;
		submit._element = document.createElement('input');
		submit._element.type = 'button';
		submit._element.value = options.value;
		submit._element.style.textAlign = 'center';
		submit._element.style.lineHeight = options.height + 'px';
		submit._element.style.padding = '0';
		if (options.onclick)
			submit._element.addEventListener('click',options.onclick);
		return submit;
	}
});
