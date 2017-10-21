;(function(){
	var banner = document.querySelector('.banner');
	var ul = banner.querySelector('ul');
	var lis = ul.children;
	var liWidth = 0;
	var ulWidth = 0;
	var startX = 0;
	var startTime = 0;
	var count = 1;
	var timer;

	// 页面加载时：设置ul标签的宽和位置
	window.addEventListener("load",function(){
		setUlWidth();
		setTranslate(ul,- liWidth * count);
	});

	// 重置窗口大小时：设置ul标签的宽和位置
	window.addEventListener("resize",function(){
		clearInterval(timer);
		setUlWidth();
		removeTransition(ul);
		setTranslate(ul,- liWidth * count);
		move();
	});

	// 过度结束事件
	ul.addEventListener("transitionend",function(){
		if(count >= lis.length -1){
			count = 1;
			noTransitionMove();
		}
		if(count <= 0){
			count = lis.length - 2;
			noTransitionMove();
		}
	});

	// 开始触摸
	ul.addEventListener("touchstart",function(e){
		startX = e.changedTouches[0].clientX;
		startTime = new Date();
		clearInterval(timer);
	});

	// 触摸移动
	ul.addEventListener("touchmove",function(e){
		var distance = e.changedTouches[0].clientX - startX;
		removeTransition(ul);
		setTranslate(ul,- liWidth * count);
	});

	// 触摸结束
	ul.addEventListener("touchend",function(e){
		var distance = e.changedTouches[0].clientX - startX;
		var moveTime = new Date() - startTime;
		console.log("距离：" + distance + ",时间：" + moveTime);
		if(Math.abs(distance) >= liWidth / 3 || moveTime <= 300 && Math.abs(distance) >= 30){
			distance > 0 ? count-- : count++;
		}
		addTransition(ul);
		setTranslate(ul,- liWidth * count);
		move();
	})

	move();
	// 定时器函数封装
	function move(){
		timer = setInterval(function(){
			count++;
			addTransition(ul);
			setTranslate(ul,- liWidth * count);
		},1000);
	}

	// 添加过度
	function addTransition(ele){
		ele.style.transition = "all .3s";
		ele.style.webkitTransition = "all .3s";
	}

	// 移除过度
	function removeTransition(ele){
		ele.style.transition = "none";
		ele.style.webkitTransition = "none";
	}

	// 设置变换
	function setTranslate(ele,value,direction){
		direction = direction ? direction : "X";
		ele.style.transform = "translate" + direction + "(" + value +"px)";
	}

	// 无过度瞬移
	function noTransitionMove(){
		removeTransition(ul);
		setTranslate(ul,- liWidth * count);
	}

	// 设置ul标签宽的函数封装
	function setUlWidth(){
		liWidth = banner.offsetWidth;
		ulWidth = lis.length * liWidth;
		for(var i = 0; i < lis.length; i++){
			lis[i].style.width = liWidth + "px";
		}
		ul.style.width = ulWidth + "px";
	}
})();