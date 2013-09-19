
(function(ns) {

(function(scripts) {
	for (var i=0; i<scripts.length; i++) 
		document.write('<scr' + 'ipt type="text/javascript" src="' + scripts[i] + '"></scr' + 'ipt>');
})([
	// "http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js",
	// "lib/jquery.alerts/jquery.alerts.js",
	// <link href="lib/jquery.alerts/jquery.alerts.css" rel="stylesheet" type="text/css" />
	
	"enchant/enchant.js",
	"enchant/plugins/tl.enchant.js" , 
	"enchant/plugins/ui.enchant.js" , 
	"enchant/plugins/extendMap.enchant.js" , 
/***
	"enchant/plugins/widget.enchant.js" , 
	"enchant/plugins/adavar.enchant.js" , 
	"enchant/plugins/extendMap.enchant.js" , 
**/
	"js/init.js",
		
	"js/common.js",
	"js/config.js",	
	
	"js/class/socket.js" , 
	"js/class/resources.js" , 
	"js/class/dialog.js" , 
	"js/class/mymap/map.js" , 
	"js/class/mymap/player.js" , 
	
	"js/scenes/base.js" , 
	"js/scenes/title.js" , 
	"js/scenes/name.js" , 
	"js/scenes/map.js" , 
	"js/scenes/fight.js" , 
	"js/scenes/talk.js" , 
/**	
	"js/dialog.js",
	
	"js/character.js",
	"js/player.js",
		
	"js/map/map.js",
	"js/map/character.js",
	"js/map/player.js",
	"js/map/friend.js",
	
	"js/scenes/switch-screen.js",
	"js/scenes/dialog.js",
	"js/scenes/prompt.js",
	"js/scenes/title.js",
	"js/scenes/config.js",
	"js/scenes/map.js",
	"js/scenes/fight.js",
***/
	"js/main.js"
]);

document.write('<scr' + 'ipt type="text/javascript" src="http://' + 
			location.host + ':3000/socket.io/socket.io.js"></scr' + 'ipt>');

})(window);


