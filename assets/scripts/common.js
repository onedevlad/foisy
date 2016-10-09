var headerSliderTimeout = 5000
var scrollDownSpeed = 400
var lightboxMaxWidth = 2.5

var defaultSliderConfig = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  arrows: false,
}

var lightboxConfig = {
  maxWidth: outerWidth / 2.5,
  maxHeight: outerHeight / 1.5
}


// DO NOT EDIT BELOW THIS POINT


//@prepros-prepend ../lib/imagesloaded/imagesloaded.min.js

$(document).ready(function(){
  $('body').imagesLoaded().always(function(){
    $('.preloader').addClass('loaded')
  })
})

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
  lightbox.option(lightboxConfig)
})


$(document).ready(function() { // Header slider module
  var timeout = null

  var $activeBox = $('.header-slider-control-box.active')
  var currentHeaderSlide = $activeBox.index() - 1
  var headerSlidesCount = $('.header-background').length - 1

  var timeoutFunction = function(){
    if(currentHeaderSlide > headerSlidesCount) currentHeaderSlide = 0
    $('.header-slider-control-box').eq(currentHeaderSlide).click()

    currentHeaderSlide += 1
  }

  $('.header-slider-control-box').click(function(){
    var $this = $(this)
    var index = $this.index()

    currentHeaderSlide = index - 1

    $('.header-slider-control-box.active').removeClass('active')
    $this.addClass('active')

    $('.header-current-slide').html('0' + index)

    $('.header-background').removeClass('active')
    $('.header-background').eq(currentHeaderSlide).addClass('active')

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