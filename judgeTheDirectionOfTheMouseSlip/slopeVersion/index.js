;(function () {
  $('.content').on('mouseenter mouseleave', function (e) {
    // 以浏览器左上角做原点，水平轴作为 x 轴，往右为正；竖直轴作为 y 轴，向上为正。
    // 中间的 div 的左上角坐标 (x1, y1),右下角坐标 (x2, y2),中心点的坐标 (x0, y0)。
    // 鼠标刚移入时，鼠标的坐标设为 (x, y)
    var e = e || window.event,
        $this = $(this),
        $shadow = $this.find('.shadow'),
        eventType = e.type,
        x1 = $this.offset().left,
        y1 = -$this.offset().top, // 所有的 y 坐标都是负数
        x2 = x1 + $this.width(),
        y2 = y1 - $this.height(),
        x0 = (x1 + x2) / 2,
        y0 = (y1 + y2) / 2,
        // 斜率 k
        baseSlope = (y2 - y1) / (x2 - x1),
        x = e.pageX,
        y = -e.pageY,
        // slope 是鼠标移入点和中心点的斜率
        slope = (y - y0) / (x - x0);
    // 当 slope 大于 baseSlope 并且小于 -baseSlope 时，则肯定是左右移入，当移入点的 x 坐标大于中心点 ，则为右移入，小于则是左移入
    if(slope > baseSlope && slope < -baseSlope){
      if(x > x0){
        animate('right', eventType, $shadow);
      }else{
        animate('left', eventType, $shadow);
      }
    }else{
      //注意此处 y 是负数
      if(y > y0){
        animate('top', eventType, $shadow);
      }else{
        animate('bottom', eventType, $shadow);
      }
    }
  });
  function animate(direction, type, ele) {
    var timer = 200;
    if (type == 'mouseenter') {
      ele.stop(true, true);
    }
    if (direction == 'top') {
      if (type == 'mouseenter') {
        ele.css({
          display: 'block',
          top: '-100%',
          left: '0'
        }).animate({
          top: 0,
          left: 0
        }, timer)
      } else {
        ele.animate({
          display: 'block',
          top: '-100%',
          left: '0'
        }, timer)
      }
    } else if (direction == 'left') {
      if (type == 'mouseenter') {
        ele.css({
          display: 'block',
          top: '0',
          left: '-100%'
        }).animate({
          left: 0,
          top: 0
        }, timer)
      } else {
        ele.animate({
          display: 'block',
          left: '-100%'
        }, timer)
      }
    } else if (direction == 'bottom') {
      if (type == 'mouseenter') {
        ele.css({
          display: 'block',
          top: '100%',
          left: '0'
        }).animate({
          top: 0,
          left: 0
        }, timer)
      } else {
        ele.animate({
          display: 'block',
          top: '100%',
          left: '0'
        }, timer)
      }
    } else if (direction == 'right') {
      if (type == 'mouseenter') {
        ele.css({
          display: 'block',
          top: 0,
          left: '100%'
        }).animate({
          left: '0%',
          top: 0
        }, timer)
      } else {
        ele.animate({
          display: 'block',
          left: '100%'
        }, timer)
      }
    }
  }
})();