
// enchant();

var MapScene = Class.create(BaseScene, {
	"initialize" : function(game, type) {
		BaseScene.call(this, game );
		
		this.type = type || "field";
		
		this.stage = new Group();
					
		this.map = MyMap.Map.getInstance(this.type);
			
		this.characters = new Group();
		this.labels = new Group();
		this.players = {};
			
		this.stage.addChild(this.map);
		this.stage.addChild(this.characters);
		this.stage.addChild(this.map.createForegroundMap());
		this.stage.addChild(this.labels);
		
		// pad 
		this.pad = new Pad();
		this.pad.x = 0;
		this.pad.y = 220;
		
		// buttons 
		this.btns = {};
		this.btns.fight = new Dialog('戦闘',{"width" : 80});
		this.btns.fight.x = (game.width - this.btns.fight.bg.width - 4);
		this.btns.fight.y = (game.height - this.btns.fight.bg.height - 4);
		
		this.btns.talk = new Dialog('話しかける',{"width" : 80});
		this.btns.talk.x = (this.btns.fight.x - this.btns.talk.bg.width - 4);
		this.btns.talk.y = this.btns.fight.y;
		
		this.addChild(this.stage);
		this.addChild(this.pad);
		this.addChild(this.btns.fight);
		this.addChild(this.btns.talk);
		
		this.addEventListener('enterframe' , this.enterframe);		
		this.btns.fight.addEventListener('touchstart' , function() {
			configs.scenes.fight.initFight();
			configs.scenes.fight.pushScene();
		});
		this.btns.talk.addEventListener('touchstart' , function() {
			configs.scenes.talk.pushScene();
		});
	} ,  
	"addSelf" : function() {
		this.removeSelf();
		
		this.self = new MyMap.Player(this.map, configs.player.x0, configs.player.y0);
		configs.player.map = this.type;
		configs.player.x0 = this.self.x0;
		configs.player.y0 = this.self.y0;
		configs.player.x = this.self.x;
		configs.player.y = this.self.y;
		
		this.self.name = configs.player.name;
		
		this.characters.addChild(this.self);
		this.labels.addChild(this.self.getLabelBg());	
		this.labels.addChild(this.self.getLabel());	
		socket.player.sender.sync();
			
		this.players[socket.sess_id] = this.self;
	},
	"removeSelf" : function() {
		if (this.self) {
			this.self.remove();
			
			this.characters.removeChilde(this.self);
			this.labels.removeChild(this.self.getLabelBg());	
			this.labels.removeChild(this.self.getLabel());
			this.self = null;
			
			delete(this.players[socket.sess_id]);
		}
	} ,
	"addPlayer" : function(socket_id, player) {
		this.characters.addChild(player);
		this.players[socket_id] = player;
		this.labels.addChild(player.getLabelBg());	
		this.labels.addChild(player.getLabel());	
	},
	"removePlayer" : function(socket_id) {
		this.players[socket_id].remove();
		this.characters.removeChild(this.players[socket_id]);
		this.labels.removeChild(this.players[socket_id].getLabelBg());
		this.labels.removeChild(this.players[socket_id].getLabel());
		delete(this.players[socket_id]);
	},
	"enterframe" : function() {
		if (this.self) {
			var map = this.map;
			
			var x = Math.min( (this.game.width - 16)/2 - this.self.x ,0);
			var y = Math.min( (this.game.height - 16)/2 - this.self.y , 0 );
			x = Math.max(this.game.width , x + map.width) - map.width;
			y = Math.max(this.game.height, y + map.height) - map.height;
			
			this.stage.x = x;
			this.stage.y = y;
		}
		//=== 移動処理　
		if (! this.isMoving) {
			var dir = 0;
			var vx = 0, vy = 0;
			if (this.game.input.left)  { dir = 1; vx = -1; }
			else if (this.game.input.right) { dir = 2; vx =  1; }
			else if (this.game.input.up)    { dir = 3; vy = -1; }
			else if (this.game.input.down)  { dir = 4; vy =  1; }
		
			if (dir) {	
				this.self.dir = dir;
				var x = this.self.x + 16 * vx + 16;
				var y = this.self.y + 16 * vy + 16;
				if (0 <= x && x < this.map.width && 
				    0 <= y && y < this.map.height ) 
				{
					if (! this.map.hitTest(x,y,this.self) && ! this.map.isSea(x,y)) {
						this.isMoving = true;
						socket.player.sender.move(this,dir,vx,vy);
					}
				}
				if (! this.isMoving) {
					socket.player.sender.turn(this,dir,0,0);
				}
			}
		}
	}
});
MapScene._maps = {};
MapScene.getScene = function(type) {
	if (! MapScene._maps[type]) {
		MapScene._maps[type] = new MapScene(game, type);		
	}
	return MapScene._maps[type];
};
MapScene.pushScene = function(type) {
	game.pushScene( MapScene.getScene(type) );
};
MapScene.popScene = function() {
	game.popScene();
};
