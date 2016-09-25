var headerSliderTimeout = 5000
var scrollDownSpeed = 400
var lightboxMaxWidth = 2.5
var SliderAutoPlay = true
var SliderAutoPlaySpeed = 5000


// DO NOT EDIT BELOW THIS POINT


$(document).ready(function(){ // Nav module
  var openNav = function() {
    $('.nav-open-button').addClass('nav-open-button-active').unbind('click').click(closeNav)
    $('.nav').addClass('nav-opened')
    function anim(cur) {
      TweenLite.delayedCall(0.1, function() {
        TweenLite.to($('.nav-link-'+cur), 0.2, { left: 0, opacity: 1 })
        if(cur <= 4) anim(++cur)
      })
    }
    anim(0)
  }

  var closeNav = function() {
    $('.nav-open-button').removeClass('nav-open-button-active').unbind('click').click(openNav)
    function anim(cur) {
      TweenLite.delayedCall(0.1, function() {
        TweenLite.to($('.nav-link-'+cur), 0.2, { left: '50%', opacity: 0 })
        if(cur > 0) anim(--cur)
        if(cur === 0)
          $('.nav').removeClass('nav-opened')
      })
    }
    anim(4)
  }
  $('.nav-open-button').click(openNav)
})

$(document).ready(function() { // Lightbox config module
  lightbox.option({
    maxWidth: $(window).width() / lightboxMaxWidth
  })
})


$(document).ready(function() { // Slick config module
  if(jQuery().slick) {
    $('.slick-slider').slick({
      autoPlaySpeed: SliderAutoPlaySpeed,
      autoplay: SliderAutoPlay,
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
  }
})

$(document).ready(function() { // Header slider module
  var timeout = null

  var $activeBox = $('.header-slider-control-box.active')
  var currentHeaderSlide = $activeBox.index() - 1

  var timeoutFunction = function(){
    currentHeaderSlide += 1
    if(currentHeaderSlide > 4) currentHeaderSlide = 0

    $('.header-slider-control-box').eq(currentHeaderSlide).click()
  }

  $('.header-slider-control-box').click(function(){
    var $this = $(this)
    var index = $this.index()

    currentHeaderSlide = index - 1

    $('.header-slider-control-box.active').removeClass('active')
    $this.addClass('active')

    $('.header-current-slide').html('0' + index)

    $('.header-background').removeClass('active')
    $('.header-background-' + index).addClass('active')

    clearTimeout(timeout)
    timeout = setTimeout(timeoutFunction, headerSliderTimeout)
  })

  $activeBox.click()
})

$(document).ready(function(){ // Scrolldown module
  $('.scroll-down').click(function(){
    $('html, body').animate({ scrollTop: $('.header').height() }, scrollDownSpeed)
  })
})