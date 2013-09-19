
var Resource = Class.create({
	"get" : function(k) {
		if (! configs.RESOURCES || ! configs.RESOURCES[k]) 
			return null;
		var path = configs.RESOURCES[k];
		return game.assets[path] || null;
	} 
});

