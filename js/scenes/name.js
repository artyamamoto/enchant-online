

var NameScene = Class.create(BaseScene, {
	"initialize" : function(game, callback) {
		BaseScene.call(this, game);
		var self = this;
		
		this.backgroundColor  = 'rgba(0,0,0,0.5)';
		
		var x = 24, y = (game.height / 2 - 68);
		
		this.text = this.createText({
			"type"   : "text" , 
			"width"  : (game.width - x * 2) , 
			"height" : 20 , 
			"x"      : x , 
			"y"      : y ,
			"value" : "" , 	
			"placeholder" : "名前を入力してください"
		});
		this.addChild(this.text);
		
		y += 48;
		
		this.submit = this.createButton({
			"width"  : (game.width - x * 2) , 
			"height" : 20 , 
			"x"      : x , 
			"y"      : y , 
			"value" : "これでスタートする",
			"onclick" : function() {
				self._onsubmit();
			}
		});
		this.addChild(this.submit);

		this.oncomplete = callback;
	} , 
	"_onsubmit" : function() {
		var s = this.text._element.value;	
		console.log(s);
		
		if (! s) {
			alert('名前が入力されていません。');
			return;
		}
			
		// this.popScene();
		this.oncomplete.call(this, s);
	}
});
