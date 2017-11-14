(function(window) {
	function Snake(obj) {
		this.width = obj.width || 30;
		this.height = obj.height || 30;
//		this.headColor = obj.headColor || "red";
		this.headImg = obj.headImg;
//		this.bodyColor = obj.bodyColor || "yellow";
		this.bodyImg = obj.bodyImg;
		this.map = obj.map;
		this.direction = "right";
		this.elements = [];
		this.body = [{
				x: 3,
				y: 1,
//				color: this.headColor
				bgImg: this.headImg
			},
			{
				x: 2,
				y: 1,
//				color: this.bodyColor
				bgImg: this.bodyImg
			},
			{
				x: 1,
				y: 1,
//				color: this.bodyColor
				bgImg: this.bodyImg
			}
		];
		this.render()
	}
	Snake.prototype = {
		render: function() {
			for(var i = 0; i < this.body.length; i++) {
				var element = document.createElement("div");
				this.elements.push(element);
				element.style.position = "absolute";
				element.style.width = this.width + "px";
				element.style.height = this.height + "px";
//				element.style.backgroundColor = this.body[i].color;
				element.style.backgroundImage = this.body[i].bgImg;
				element.style.backgroundSize = "contain";
				element.style.left = this.body[i].x * this.width + "px";
				element.style.top = this.body[i].y * this.height + "px";
				this.map.appendChild(element);
			}
		},
		move: function(food) {
			for(var i = this.body.length - 1; i > 0; i--) {
				this.body[i].x = this.body[i - 1].x;
				this.body[i].y = this.body[i - 1].y;
			}
			switch(this.direction) {
				case "right":
					this.body[0].x++;
					break;
				case "left":
					this.body[0].x--;
					break;
				case "up":
					this.body[0].y--;
					break;
				case "down":
					this.body[0].y++;
					break;
			}
			if(this.body[0].x == food.x && this.body[0].y == food.y){
				this.body.push({
					x: this.body[this.body.length - 1].x,
					y: this.body[this.body.length - 1].y,
//					color: this.bodyColor
					bgImg: food.foodImg
				})
				food.render()
			}
			for(var j = 0; j < this.elements.length; j++) {
				this.map.removeChild(this.elements[j]);
			}
			this.elements = [];
			this.render();
		}
	}
	window.Snake = Snake;
})(window)