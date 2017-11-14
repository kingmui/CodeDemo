(function(window) {
	function Food(obj) {
		this.width = obj.width || 30;
		this.height = obj.height || 30;
		// this.color = obj.color || "orange";
		this.foodImg = obj.foodImg;
		this.map = obj.map;
		this.x = 0;
		this.y = 0;
		this.element = document.createElement("div");
		this.init()
	}
	Food.prototype = {
		init: function() {
			this.element.style.width = this.width + "px";
			this.element.style.height = this.height + "px";
			// this.element.style.backgroundColor = this.color;
			this.element.style.backgroundImage = this.foodImg;
			this.element.style.backgroundSize = "contain";
			this.render()
		},
		render: function() {
			this.x = Math.floor(Math.random() * (this.map.offsetWidth / this.width));
			this.y = Math.floor(Math.random() * (this.map.offsetHeight / this.height));
			this.element.style.position = "absolute";
			this.element.style.left = this.x * this.width + "px";
			this.element.style.top = this.y * this.height + "px";
			this.map.appendChild(this.element);
		}
	}
	window.Food = Food;
})(window)