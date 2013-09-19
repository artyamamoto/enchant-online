
var datas = require('../datas');
var sockets = {};

var observer = new (function() {
	var self = this;
	
	self._check = function() {
		for (var socket_id in datas.players) {
			var player = datas.players[socket_id];
			if (! player.isMoving) 
				continue;
			
			switch(player.isMoving) {
				case 1:
				case 2:
				case 3:
				case 4:
					player.x += player.vx * 4;
					player.y += player.vy * 4;
					sockets[socket_id].broadcast.move(socket_id);
				break;
			}
			player.isMoving = (player.isMoving + 1) % 5;
		}
		setTimeout(self._check , 1000.0/15);
	};
	self._check();
	return self;	
})();


var socketobj = function(socket) {
	var self = this;
	self.socket = socket;
	// self.socket_id = socket.id;
	sockets[self.socket.id] = self;
	
	//=== broadcast
	self.broadcast = {};
	self.broadcast.sync = function() {
		self.socket.broadcast.emit('player sync', self.socket.id, datas.players[self.socket.id]);
	};
	self.broadcast.move = function(socket_id) {
		self.socket.emit('player move', socket_id, datas.players[socket_id]);
		self.socket.broadcast.emit('player move', socket_id, datas.players[socket_id]);
		//self.socket.broadcast.emit('player move', self.socket.id, datas.players[self.socket.id], x0,y0,x1,y1,dir);
	};
	self.broadcast.turn = function(socket_id) {
		self.socket.emit('player turn', socket_id,datas.players[socket_id]);
		self.socket.broadcast.emit('player turn', socket_id,datas.players[socket_id]);
	}
	self.broadcast.disconnect = function(socket_id) {
		self.socket.broadcast.emit('player disconnect' , socket_id, datas.players[socket_id]);
	}
	//=== listeners 
	self.listeners = {};
	self.listeners.sync = function(player) {
		datas.players[self.socket.id] = player;
		self.broadcast.sync();
		console.log('sync',player);
	};
	self.listeners.move = function(dir,vx,vy) {
		// datas.players[self.socket.id] = player;
		datas.players[self.socket.id].dir = dir;
		datas.players[self.socket.id].vx = vx;
		datas.players[self.socket.id].vy = vy;
		datas.players[self.socket.id].isMoving = 1;
		
		datas.players[self.socket.id].x0 += vx;
		datas.players[self.socket.id].y0 += vy;
			
		console.log('move',arguments,datas.players[self.socket.id]);
	};
	self.listeners.turn = function(dir) {
		datas.players[self.socket.id].dir = dir;
		self.broadcast.turn(self.socket.id);
	};
	self.listeners.disconnect = function() {
		self.broadcast.disconnect(self.socket.id);
		try {
			delete datas.players[self.socket.id];
		} catch(e) {}	
	};
	//=== init
	( function() {
		self.socket.on('load' , function() {
			// map
			self.socket.emit('map sync' , datas.map);
			
			// players 
			for (var socket_id in datas.players) 
				self.socket.emit('player sync' , socket_id, datas.players[socket_id]);
			
			self.socket.emit('load complete');
		});		
		// listeners 
		socket.on('player sync' , self.listeners.sync);
		socket.on('player move' , self.listeners.move);
		socket.on('player turn' , self.listeners.turn);
		socket.on('disconnect' , self.listeners.disconnect);
	})();

	return self;
};

module.exports = socketobj;

