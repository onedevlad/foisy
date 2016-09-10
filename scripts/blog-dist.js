$(document).ready(function(){ // Nav module
  var openNav = function() {
    TweenLite.to($('.nav'), 0.2, { right: 0, onComplete: function(){
      function anim(cur) {
        TweenLite.delayedCall(0.1, function() {
          TweenLite.to($('.nav-link-'+cur), 0.2, { left: 0, opacity: 1 })
          if(cur <= 4) anim(++cur)
        })
      }
      anim(0)
    }})
  }

  var closeNav = function() {
    function anim(cur) {
      TweenLite.delayedCall(0.1, function() {
        TweenLite.to($('.nav-link-'+cur), 0.2, { left: '50%', opacity: 0 })
        if(cur > 0) anim(--cur)
        if(cur === 0)
          TweenLite.to($('.nav'), 0.2, { right: '-25%'})
      })
    }
    anim(4)
  }
  $('.nav-close-button').click(closeNav)
  $('.nav-open-button').click(openNav)
})

$(document).ready(function() { // Lightbox config module
  lightbox.option({
    maxWidth: $(window).width() / 2.5
  })
})

$(document).ready(function() { // Slick config module
  $('.slick-slider').slick({
    autoPlaySpeed: 5000,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    }],
  })
  .on('afterChange', function(slick, currentSlideObj){
    var activeCheckbox = currentSlideObj.currentSlide < 3 ? 0 : 1
    $('.slider-control-box.active').removeClass('active')
    $('.slider-control-box:eq(' + activeCheckbox + ')').addClass('active')
    $('.current-slide').html('0' + (activeCheckbox + 1))
  })
  $('.slider-control-box').click(function(){
    var index = $(this).index()
    $('.slick-slider').slick('slickGoTo', index ? 4 : 1)
  })
})

$(document).ready(function() { // Header slider module
  var $activeBox = $('.header-slider-control-box.active')
  var currentHeaderSlide = $activeBox.index() - 1
  $('.header-slider-control-box').click(function(){
    var $this = $(this)
    var index = $this.index()

    currentHeaderSlide = index - 1

    $('.header-slider-control-box.active').removeClass('active')
    $this.addClass('active')

    $('.header-current-slide').html('0' + index)

    $('.header-background').css('opacity', '0')
    $('.header-background-' + index).css('opacity', '1')
  })
  $activeBox.click()

  setInterval(function(){
    currentHeaderSlide += 1
    if(currentHeaderSlide > 4) currentHeaderSlide = 0
    $('.header-slider-control-box').eq(currentHeaderSlide).click()
  }, 5000)
})
;//@prepros-prepend common.js
