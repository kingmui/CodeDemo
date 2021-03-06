(function ($) {
  $.fn.extend({
    'mouseMove': function (child) {
      $(this).hover(function (e) {
        $this = $(this);
        var ele = $this.find(child);
        var pageX = e.pageX;
        var pageY = e.pageY;
        var top = parseInt($this.offset().top);
        var bottom = parseInt(top + $this.height());
        var left = parseInt($this.offset().left);
        var right = parseInt(left + $this.width());
        var absTop = Math.abs(pageY - top);
        var absBottom = Math.abs(pageY - bottom);
        var absLeft = Math.abs(pageX - left);
        var absRight = Math.abs(pageX - right);
        var min = Math.min(absTop, absBottom, absLeft, absRight);
        var eventType = e.type;
        switch (min) {
          case absTop:
            animate('top', eventType, ele);
            break;
          case absBottom:
            animate('bottom', eventType, ele);
            break;
          case absLeft:
            animate('left', eventType, ele);
            break;
          case absRight:
            animate('right', eventType, ele);
            break;
          default:
            break;
        }
      })
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
  $('.content').mouseMove('.shade');
})(window.jQuery);