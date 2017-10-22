;(function(){
	var banner = document.querySelector('.banner');
	var ul = banner.querySelector('ul');
	var indicators = banner.querySelectorAll('ol>li');
	var lis = ul.children;
	var liWidth = 0;
	var ulWidth = 0;
	var startX = 0;
	var startTime = 0;
	var count = 1;
	var timer;
	var Carousel = {};
	Carousel.move = function(){
		// 定时器函数封装
		timer = setInterval(function(){
			count++;
			Carousel.addTransition(ul);
			Carousel.setTranslate(ul,- liWidth * count);
		},2000);
	}
	Carousel.boundaryJudgment = function(){
		// 边界值判断
		if(count >= lis.length -1){
			count = 1;			
		}
		if(count <= 0){
			count = lis.length - 2;			
		}
		Carousel.removeTransition(ul);
		Carousel.setTranslate(ul,- liWidth * count);
	}
	Carousel.addTransition = function(ele){
		// 添加过度
		ele.style.transition = "all .5s";
		ele.style.webkitTransition = "all .5s";
	}
	Carousel.removeTransition = function(ele){
		// 移除过度
		ele.style.transition = "none";
		ele.style.webkitTransition = "none";
	}
	Carousel.setTranslate = function(ele,value,direction){
		// 设置变换
		direction = direction ? direction : "X";
		ele.style.transform = "translate" + direction + "(" + value +"px)";
	}
	Carousel.setUlWidth = function(){
		// 设置ul标签宽的函数封装
		liWidth = banner.offsetWidth;
		ulWidth = lis.length * liWidth;
		for(var i = 0; i < lis.length; i++){
			lis[i].style.width = liWidth + "px";
		}
		ul.style.width = ulWidth + "px";
	}

	// 页面加载时：设置ul标签的宽和位置
	window.addEventListener("load",function(){
		Carousel.setUlWidth();
		Carousel.setTranslate(ul,- liWidth * count);
	});

	// 重置窗口大小时：设置ul标签的宽和位置
	window.addEventListener("resize",function(){
		clearInterval(timer);
		Carousel.setUlWidth();
		Carousel.removeTransition(ul);
		Carousel.setTranslate(ul,- liWidth * count);
		Carousel.move();
	});

	Carousel.move();

	// 过度结束事件
	ul.addEventListener("transitionend",function(){
		Carousel.boundaryJudgment();
		// 同步小圆点
		for(var i = 0; i < indicators.length; i++){
			indicators[i].classList.remove("current");
		}
		indicators[count - 1].classList.add("current");
	});

	// 开始触摸
	ul.addEventListener("touchstart",function(e){
		startX = e.changedTouches[0].clientX;
		startTime = new Date();
		clearInterval(timer);
	});

	// 触摸移动
	ul.addEventListener("touchmove",function(e){
		Carousel.boundaryJudgment();
		var distance = e.changedTouches[0].clientX - startX;
		Carousel.removeTransition(ul);
		Carousel.setTranslate(ul,-liWidth * count + distance);
	});

	// 触摸结束
	ul.addEventListener("touchend",function(e){
		Carousel.boundaryJudgment();
		var distance = e.changedTouches[0].clientX - startX;
		var moveTime = new Date() - startTime;
		console.log("距离：" + distance + ",时间：" + moveTime);
		if(Math.abs(distance) >= liWidth / 3 || moveTime <= 300 && Math.abs(distance) >= 30){
			distance > 0 ? count-- : count++;
		}
		Carousel.addTransition(ul);
		Carousel.setTranslate(ul,- liWidth * count);
		Carousel.move();
	});
})();