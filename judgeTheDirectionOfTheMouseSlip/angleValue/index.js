;(function() {
  var $shadow = $('.shadow'),
    $line = $('.line'),
    $res = $('.res');
  $('li').on('mouseenter mouseleave', function(e) {
    var $this = $(this);
    var w = $this.width(); //获取元素宽度
    var h = $this.height(); //获取元素高度
    var x = e.pageX - $this.offset().left - w / 2; // 获取当前鼠标的 x 轴位置（相对于这个 li 的中心点）
    var y = e.pageY - $this.offset().top - h / 2; // 获取当前鼠标的 y 轴位置（相对于这个 li 的中心点）
    // direction 的值为 '0、1、2、3'，分别对应着 '上、右、下、左'
    var direction = Math.round((((Math.atan2(y, x) * 180 / Math.PI) + 180) / 90) + 3) % 4;
    // Math.atan2(y,x) 返回 -PI 到 PI 之间的值(负180°到正180°)，是从 X 轴正向逆时针旋转到点 (x,y) 时经过的角度，里的结果是一个**弧度值**。
    // 请注意这个函数的参数顺序，Y 坐标在 X 坐标之前传递。
    // (Math.atan2(y, x) * 180 / Math.PI 将弧度值转换为角度值
    // 当鼠标从右边进入的时候，角度是在 -45°~45° 之间，底部是 45°~135°，左边 135°~180° 或 -180°~-135°，顶部是 -135°~-45°
    // 因为上面计算出来的结果不符合我们的习惯，并且负值在计算的时候会影响正确性
    // 现在我们给这个结果加上180，让角度范围变成我们习惯的 0~360°。当加上 180 之后 0° 的位置就在左边的中间了
    // 所以现在的范围变成了：
    // 0~44 或 360~315 左边
    // 45~134 上边
    // 135~224 右边
    // 225~314 下边
    // 现在我们把算出来的角度除以 90，然后四舍五入
    // 上边算出来的结果为 1
    // 右边算出来的结果为 2
    // 下边算出来的结果为 3
    // 左边算出来的结果有两种：0~44为 0，315~360 为 4
    // 现在算出来的结果一共有5个值（左边2个，其他三个面各一个）。下面我们再精简一下结果，我们给每次的结果都加上 3，然后和 4 取余
    // 左边加3之后就是3和7，然后取余后为 3
    // 上边加3之后为4，取余后为 0
    // 右边加3为5，取余为 1
    // 下边加3为6，取余为 2
    // 最终的结果就是：0->上边，1->右边，2->下边，3->左边

    var res = Math.atan2(y, x) / (Math.PI / 180) + 180;
    var dirName = new Array('上方', '右侧', '下方', '左侧');

    $line.css('transform', 'rotate(' + res + 'deg)');

    if(e.type === 'mouseenter') {
      $res.text(dirName[direction] + '进入');
      animationIn(direction, $shadow);
    } else {
      $res.text(dirName[direction] + '离开');
      animationOut(direction, $shadow);
    }
  });

  function animationIn(direction, ele) {
    ele.stop(true, true);
    switch(direction) {
      case 0:
        ele.css({
          left: 0,
          top: '-100%'
        }).animate({
          top: 0
        }, 300);
        break;
      case 1:
        ele.css({
          left: '100%',
          top: 0
        }).animate({
          left: 0
        }, 300);
        break;
      case 2:
        ele.css({
          left: 0,
          top: '100%'
        }).animate({
          top: 0
        }, 300);
        break;
      case 3:
        ele.css({
          left: '-100%',
          top: 0
        }).animate({
          left: 0
        }, 300);
        break;
    }
  }

  function animationOut(direction, ele) {
    switch(direction) {
      case 0:
        ele.animate({
          top: '-100%'
        }, 300);
        break;
      case 1:
        ele.animate({
          left: '100%'
        }, 300);
        break;
      case 2:
        ele.animate({
          top: '100%'
        }, 300);
        break;
      case 3:
        ele.animate({
          left: '-100%'
        }, 300);
        break;
    }
  }
})();