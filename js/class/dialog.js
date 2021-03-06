
var Dialog = Class.create(Group, {
	"initialize" : function(str,options) {
		Group.call(this);
		
		options = options || {};
		width = options.width || 0;
		height = options.height || 0;
		
			
		this.label = this.getLabel(str);
		this.bg = this.getLabelBg(this.label, width, height);
		
		this.addChild(this.bg);
		this.addChild(this.label);
	},
	"getLabelBg" : function(label,width,height) {
		var w = 0 , h = 0;
		var padding = 8;
		if (label) {
			w = label._boundWidth + padding * 2;
			h = label._boundHeight + padding * 2;
		}
		
		var padding = 8;
		var width = Math.max(width, w);
		var height = Math.max(height, h);
		
		var labelbg = new Sprite( width, height );
		var sf = new Surface( width , height); 
		var fill = function(style,x,y) {
			sf.context.fillStyle = style;
			sf.context.fillRect(x,y,sf.width-x*2,sf.height-y*2);
		};
		fill('rgba(0,0,0,1)',0,0);
		fill('rgba(255,255,255,1)',1,1);
		fill('rgba(0,0,0,1)',2,2);
		
		labelbg.image = sf;
		
		labelbg.x = labelbg.y = 0;
		
		return labelbg;
	},
	"getLabel" : function(str) {
		var label = new Label();
		label.font = '12px monospace';
		label.text = str;
		label.color = '#ffffff';		
		//this._label._style.border = '1px solid #000';
		//this._label._style.backgroundColor = "#fff";
		
		label.x = 8;
		label.y = 8;
		
		return label;
	}
});

