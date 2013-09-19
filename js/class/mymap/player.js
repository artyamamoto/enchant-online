
var MyMap = MyMap || {};
MyMap.Player = Class.create(Sprite, {
	"syncMap" : function(upd) {
		if (this._before_pos) {
			var pos = this._before_pos;
			this.map.attr(pos.x , pos.y ,'player' , false );
		}
		if (upd === false) {
			return;
		}
		var pos = {
			x : this.x + 16 , 
			y : this.y + 16 
		};
		this._before_pos = pos;
		this.map.attr(pos.x , pos.y , 'player' , this);
		console.log('syncMap', pos.x, pos.y , this);
	},
	"createImage" :  function() {
		var surface = new Surface(96, 128);	
		surface.draw(resources.get('player'), 0,0,96,128,0,0,96,128);
		this.image = surface;
	},
	"put" : function(x0,y0) {
		if (x0 < 0 || y0 < 0) {
			this.map.putPlayer(this);
			return;
		}	
		
		// マップ上の位置
		this.x0 = x0; 
		this.y0 = y0; 
		
		// 実際のX/Y座標
		this.x = x0 * 16 - 8;
		this.y = y0 * 16;	
		
		this.syncMap();	
	},
	"remove" : function() {
		this.syncMap(false);
	},
	"initialize" : function(map,x0, y0) {
		Sprite.call(this, 32,32);
		this.map = map;
		
		this.put(x0,y0);
			
		// 画像生成
		this.createImage();
		
		// アニメーション
		this.isMoving = false;
		this.dir = 0;
		this.walk = 1;
		
		this.name = null;
			
		this.addEventListener('enterframe', this.enterframe);
	} ,
	"getLabelBg" : function() {
		if (this._labelbg) 
			return this._labelbg;
	
		var self = this;
		var label = this.getLabel();
		
		var padding = 8;
		var width = label._boundWidth + padding * 2;
		var height = label._boundHeight + padding * 2;
		
		this._labelbg = new Sprite( width, height );
		var sf = new Surface( width , height); 
		var fill = function(style,x,y) {
			sf.context.fillStyle = style;
			sf.context.fillRect(x,y,sf.width-x*2,sf.height-y*2);
		};
		fill('rgba(0,0,0,0.4)',0,0);
		fill('rgba(255,255,255,0.4)',1,1);
		fill('rgba(0,0,0,0.4)',2,2);
		
		this._labelbg.image = sf;
		this._labelbg.x = ((this.x + this.width / 2) - this._labelbg.width / 2);
		this._labelbg.y =  this.y - this._labelbg.height + 8 ;
		
		return this._labelbg;
	},
	"getLabel" : function() {
		if (this._label) 
			return this._label;
		
		this._label = new Label();
		this._label.font = '12px \'MS ゴシック\'';
		this._label.text = this.name;
		this._label.color = '#ffffff';		
		//this._label._style.border = '1px solid #000';
		//this._label._style.backgroundColor = "#fff";
		this._label.moveTo( ((this.x + this.width / 2) - this._label._boundWidth / 2) , 
							  this.y - this._label._boundHeight );
		
		return this._label;
	},
	"enterframe" : function() {
		this.frame = this.dir * 3 + this.walk;
		if (this.isMoving && game.frame % 3) {
			this.walk = (this.walk + 1) % 3;
		}
		if (this._label) {
			this._label.x = (this.x + this.width / 2) - this._label._boundWidth / 2;
			this._label.y = ( this.y - this._label._boundHeight );
		}
		if (this._labelbg) {
			this._labelbg.x = ((this.x + this.width / 2) - this._labelbg.width / 2);
			this._labelbg.y = this.y - this._labelbg.height + 8 ;
		}
	},

	"talkto" : function(person) {
		// this._stop = true;
		person.talked(this);
		
		var name = Player.getInstance().name;
		var dialog = new DialogScene(game, {"message" : person.message, "name" : name });
		dialog.oncomplete = function() {
			// console.log('oncomplete');
			// this._stop = false;	
			person.talked(null);
		};
		dialog.show();
	} /* ,
	"investigate" : function() {
		if (! this.vx && ! this.vy) {
			var x = this.x;
			var y = this.y;
			switch(this.dir) {
				case 1 : x = x - 16; break;
				case 2 : x = x + 16; break;
				case 3 : y = y - 16; break;
				case 4 : y = y + 16; break;
			}
			x += 16; y += 16;
			var hit = false;
			if (0 <= x && x < this.map.width) {
				if (0 <= y && y < this.map.height) {
					if (! this.map.isSea(x, y)) {
						//var i = map.checkTile(x,y);
						//console.log(x,y,i);	
						this._lock_investigate = true;
						hit = this.map.investigate( x,y,);
					}
				}
			}
			if (! hit) {
				this._lock_investigate = true;
				hit = this.map.investigate(this.x + 8, this.y + 8);
			}
		}
	} */
});
