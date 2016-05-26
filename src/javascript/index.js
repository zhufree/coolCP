require.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': ['http://cdn.bootcss.com/jquery/2.2.3/jquery'],
  }
});
require(['jquery'],
function( $ ) {
  var it;

  function nextOne(isDirect, direction) {
    if (isDirect) {
      $('.prev').removeClass('prev');
      $('.active').removeClass('active').addClass('prev');
      $next = $('.next');
      $next.removeClass('next').addClass('active');
      if ($next.next().length > 0) {
        $next.next().addClass('next');
      } else {
        $next.siblings().first().addClass('next');
      }
    } else {
      $('.prev').removeClass('prev');
      var actParams = direction === 'horizontal' ? {left: '-100%'} : {top : '-100%'};
      var nextParams = direction === 'horizontal' ? {left: 0} : {top : 0};
      $('.active').animate(actParams, 'slow', function () {
        $(this).removeClass('active').addClass('prev');
      });
      $('.next').animate(nextParams,'slow', function () {
        $this = $(this);
        $this.removeClass('next').addClass('active');
        var params = direction === 'horizontal' ? {left: '100%'} : {top: '100%'};
        if ($this.next().length > 0) {
          $this.next().css(params).addClass('next');
        } else {
          $this.siblings().first().css(params).addClass('next');
        }
      });
    }
  }

  function autoShow(time) { //auto change img
    return setInterval(function() {
      nextOne(true);
    }, time);
  }

  function autoMove(time, direction) { //auto move img
    return setInterval(function() {
      nextOne(false, direction);
    }, time);
  }

  if ($('.direct-carousel').length > 0) {
    it = autoShow(3000);
  } else {
    var direction = $('.slide-horizontal').length > 0 ? 'horizontal' : 'vertical';
    it = autoMove(3000, direction);
  }

  $(document).on('click', '.direct-carousel .cp-carousel-dot', function(event) {
    event.preventDefault();
    /* Act on the event */
    clearInterval(it);
    itemId = $(event.target).attr('href');
    $targetImg = $('.cp-carousel-img' + itemId);
    $targetImg.addClass('active').siblings().removeClass('active prev next');
    $targetImg.next().length > 0 ?
      $targetImg.next().addClass('next') :
      $targetImg.siblings().first().addClass('next');

    $targetImg.prev().length > 0 ?
      $targetImg.prev().addClass('prev') :
      $targetImg.siblings().last().addClass('prev');
    it = autoShow(3000);
  })
  .on('click', '.slide-carousel .cp-carousel-dot', function(event) {
    event.preventDefault();
    /* Act on the event */
    var direction = $(event.target).parents('.slide-horizontal').length > 0 ? 'horizontal' : 'vertical';
    function setDirection() {
      return direction === 'horizontal' ?
        function(param) { return {left: param};} :
        function(param) { return {top: param};};
    }
    var setParam = setDirection();

    clearInterval(it);
    itemId = $(event.target).attr('href');
    $targetImg = $('.cp-carousel-img' + itemId);//find the img to show
    $targetImg.siblings().removeClass('prev next'); //remove siblings class

    if ($targetImg.prevAll('.active').length > 0) {
      // the img is right to active one, need to slide to left
      $targetImg.css(setParam('100%')).addClass('next'); //make sure of it's position
      $('.active').animate(setParam('-100%'), 'slow').removeClass('active');
      $targetImg.animate(setParam(0), 'slow')//animate to show it
        .removeClass('next')
        .addClass('active');//add active class
    } else if ($targetImg.nextAll('.active').length > 0){
      // the img is left to active one, need to slide to right
      $targetImg.css(setParam('-100%')).addClass('prev'); //make sure of it's position
      $('.active').animate(setParam('100%'), 'slow').removeClass('active');
      $targetImg.animate(setParam(0), 'slow')//animate to show it
        .removeClass('prev')
        .addClass('active');//add active class
    }
    $targetImg.next().length > 0 ?
      $targetImg.next().css(setParam('100%')).addClass('next'):
      $targetImg.siblings().first().css(setParam('100%')).addClass('next');

    $targetImg.prev().length > 0 ?
      $targetImg.prev().css(setParam('-100%')).addClass('prev') :
      $targetImg.siblings().last().css(setParam('-100%')).addClass('prev');
    it = autoMove(3000, direction);
  });
});
