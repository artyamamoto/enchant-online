
// enchant();

var game = game || {};
var resources = game._resources = new Resource();
var socket;

window.onload = function() {
	socket = new Socket(function() {
		start();
	} , function(e) {
		console.log("エラー：" + e.message);
	});
};

function start() {
	game = new Game(configs.GAME.WIDTH,configs.GAME.HEIGHT);
	//game.keybind(88,'a'); // X
	//game.keybind(90,'b'); // Z
	game.fps = configs.FPS;
	game.preload(array_values(configs.RESOURCES));
	game.onload = function() {
		socket.emitload( function() {
			var title = new TitleScene(game);
			var map = MapScene.getScene('field');
			var talk = new TalkScene(game);
			var fight = new FightScene(game);
			var name = new NameScene(game);
			configs.scenes.title = title;
			configs.scenes.map = map;
			configs.scenes.talk = talk;
			configs.scenes.name = name;
			configs.scenes.fight = fight;
			
			title.replaceScene().addEventListener('touchstart' , function() {
				configs.scenes.name.pushScene().oncomplete = function(name) {
					configs.player.name = name;
					
					configs.scenes.map.addSelf();	
					configs.scenes.map.replaceScene();
				};
			});
		});
	};
	game.start();
};
