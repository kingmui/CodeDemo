(function(window) {
	function Game(map) {
		this.map = map;
		this.food = new Food({
			foodImg: "url(imgs/1.png)",
			map: this.map
		});
		this.snake = new Snake({
			headImg: "url(imgs/2.png)",
			bodyImg: "url(imgs/1.png)",
			map: this.map
		});
		this.bindKeyEvent();
	}

	Game.prototype = {
		startGame: function() {
			var that = this;
			var timer = setInterval(function() {
				that.snake.move(that.food);
				var head = that.snake.body[0];
				if(head.x < 0 || head.x >= that.map.offsetWidth / that.snake.width || 
					head.y <0 || head.y >= that.map.offsetHeight / that.snake.height){
					clearInterval(timer);
					alert("Game Over");
				}
				for(var i = 3;i< that.snake.body.length;i++){
					var smallSnake = that.snake.body[i];
					if(that.snake.body[0].x == smallSnake.x && that.snake.body[0].y == smallSnake.y){
						clearInterval(timer);
						alert("Game Over");
					}
				}
			}, 200);
		},
		bindKeyEvent: function() {
			var that = this;
			document.onkeyup = function(e) {
				e = e || window.event;
				switch(e.keyCode) {
					case 37:
						//左
						if(that.snake.direction != "right") {
							that.snake.direction = "left";
						}
						break;
					case 38:
						//上
						if(that.snake.direction != "down") {
							that.snake.direction = "up";
						}
						break;

					case 39:
						//右
						if(that.snake.direction != "left") {
							that.snake.direction = "right";
						}
						break;

					case 40:
						//下
						if(that.snake.direction != "up") {
							that.snake.direction = "down";
						}
						break;
				}
			}
		}
	}
	window.Game = Game;
})(window)