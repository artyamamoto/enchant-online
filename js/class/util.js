
var GameUtil = new (Class.create({
	"getLabelBg" : function(label) {
		var label = this.getLabel();
		
		var padding = 8;
		var width = label._boundWidth + padding * 2;
		var height = label._boundHeight + padding * 2;
		
		var labelbg = new Sprite( width, height );
		var sf = new Surface( width , height); 
		var fill = function(style,x,y) {
			sf.context.fillStyle = style;
			sf.context.fillRect(x,y,sf.width-x*2,sf.height-y*2);
		};
		fill('rgba(0,0,0,0.4)',0,0);
		fill('rgba(255,255,255,0.4)',1,1);
		fill('rgba(0,0,0,0.4)',2,2);
		
		labelbg.image = sf;
		
		return labelbg;
	},
	"getLabel" : function(str) {
		var label = new Label();
		label.font = '12px \'MS ゴシック\'';
		label.text = str;
		label.color = '#ffffff';		
		//this._label._style.border = '1px solid #000';
		//this._label._style.backgroundColor = "#fff";
		return label;
	}
}))();

