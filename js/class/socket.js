
var Socket = Class.create({
	"initialize" : function(callback, callback_err) {
		var self = this;
		self._connected = false;
		this.sess_id = null;
		try {
			self.sock = new io.connect('http://' + location.host + ':3000');
			self.sock.on('connect' , function() {
				self.sess_id = self.sock.socket.sessionid;
				callback.call(self);
			});
			self.sock.on('connect_failed' , function() {
				if (callback_err) 
					callback_err.call(this, {"message" : "WebSocket接続に失敗しました。"});
			});
			self.sock.on('player sync' , function() { self.player.reciever.sync.apply(self, arguments); });
			self.sock.on('player move' , function() { self.player.reciever.move.apply(self, arguments); });
			self.sock.on('player turn' , function() { self.player.reciever.turn.apply(self, arguments); });
			self.sock.on('player disconnect' , function() { self.player.reciever.disconnect.apply(self, arguments); });
			self.sock.on('map sync' , function() { self.map.reciever.sync.apply(self, arguments); });
		} catch(e) {
			if (callback_err)
				callback_err(this,e);
		}
		self.player = {
			"reciever" : {
				"sync" : function(socket_id, player) {
					console.log('socket.player.reciever.sync' , arguments);
					var map = MapScene.getScene(player.map);
	 				
					var _player = new MyMap.Player(map.map, player.x0, player.y0);
					['x','y','x0','y0','dir','isMoving','name'].forEach(function(k) {
						_player[k] = player[k];
					});
					map.addPlayer(socket_id, _player);	
				} ,
				"move" : function(socket_id, player) {
					var map = MapScene.getScene(player.map);
					var _player = map.players[socket_id];
					
					['x','y','x0','y0','dir'].forEach(function(k) {
						if (self.sess_id === socket_id)
							configs.player[k] = player[k];
						_player[k] = player[k];
					});
					map.players[socket_id] = _player;
					
					if (player.isMoving >= 4) {
						if (self.sess_id === socket_id) { 
							self._scene.isMoving = false;
							self._scene.self.isMoving = false;
						}
						_player.syncMap();
					}
				} , 
				"turn" : function(socket_id,player) {
					console.log('socket.player.reciever.turn' , arguments);
					var map = MapScene.getScene(player.map);
					var _player = map.players[socket_id];
					_player.dir = player.dir;
				},
				"disconnect" : function(socket_id, player) {
					console.log('socket.player.reciever.disconnect' , socket_id, player);
					var map = MapScene.getScene(player.map).removePlayer(socket_id);
					//var _player = map.players[socket_id];
					//_player.remove();
				}
			} , 
			"sender" : {
				"sync" : function() {
					console.log('socket.player.sender.sync',configs.player);
					self.sock.emit('player sync' , configs.player);
				},
				"move" : function(scene, dir, vx,vy) {
					self._scene = scene;
					self._scene.self.isMoving = true;
					console.log('socket.player.sender.move',arguments);
					self.sock.emit('player move', dir, vx,vy);
				},
				"turn" : function(scene, dir) {
					self.sock.emit('player turn', dir);
				} 
			}
		};
		self.map = {
			"reciever" : {
				"sync" : function(map) {
					console.log('socket.map.reciever.sync' , map);
					configs.map = map;
				}
			}
		};
	} , 
	"emitload" : function(callback) {
		this.sock.emit('load');
		this.sock.on('load complete' , function() {
			callback.call();
		});
	} 
});
/**
		sock.on('player sync' , function(socket_id, player) {
			console.log('player add : ' + player.name );
			
			var map = MapScene.getScene(player.map.type);
			var friend = new RPGMap.Friend(map.map, player.map.x, player.map.y, 'aaa');
			map.characters.addChild(friend);
		});
		sock.on('map sync' , function(map) {
			configs.map = map;
			start();
		});
		sock.on('connect' , function() {
			socket_sessid = sock.socket.sessionid;
			console.log('接続完了');
			socket = sock;
				
			// game start 
			// start();
		});
		sock.on('connect_failed', function() {
			console.log('接続失敗');
			alert('WebSocket接続に失敗しました。');
		});
**/

