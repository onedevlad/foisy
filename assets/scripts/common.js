var headerSliderTimeout = 5000
var scrollDownSpeed = 400
var lightboxMaxWidth = 2.5

var defaultSliderConfig = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  arrows: false,
}

var sliderConfig = Object.assign(defaultSliderConfig, {
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

var oneSlideSliderConfig = Object.assign({}, defaultSliderConfig, {
  slidesToScroll: 1,
  slidesToShow: 1,
})

var fadeSliderConfig = Object.assign({}, oneSlideSliderConfig, {
  fade: true,
  responsive: [{
    breakpoint: 992,
    settings: {
      fade: false,
    },
  }],
})

var lightboxConfig = {
  maxWidth: outerWidth / 2.5,
  maxHeight: outerHeight / 1.5
}



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
  lightbox.option(lightboxConfig)
})


$(document).ready(function() { // Slick config module
  if(jQuery().slick) {
    $('.slick-slider').slick(sliderConfig)
    .on('afterChange', function(slick, currentSlideObj){
      var activeCheckbox = 0
      if(currentSlideObj.currentSlide >= 0) activeCheckbox = 0
      if(currentSlideObj.currentSlide >= 2) activeCheckbox = 1
      if(currentSlideObj.currentSlide >= 5) activeCheckbox = 2
      if(currentSlideObj.currentSlide >= 8) activeCheckbox = 3
      $('.slider-control-box.active').removeClass('active')
      $('.slider-control-box:eq(' + activeCheckbox + ')').addClass('active')
      $('.current-slide').html('0' + (activeCheckbox + 1))
    })
    $('.slider-control-box').click(function(){
      var index = $(this).index()
      var indexToGo = 0
      switch(index){
        case 0: indexToGo = 0; break;
        case 1: indexToGo = 4; break;
        case 2: indexToGo = 7; break;
        case 3: indexToGo = 10; break;
      }
      $('.slick-slider').slick('slickGoTo', indexToGo)
    })

    $('.one-slide-slick-slider').slick(oneSlideSliderConfig)
    .on('afterChange', function(slick, currentSlideObj){
      var activeCheckbox = 0
      if(currentSlideObj.currentSlide) activeCheckbox = 1
      $('.slider-control-box.active').removeClass('active')
      $('.slider-control-box:eq(' + activeCheckbox + ')').addClass('active')
      $('.current-slide').html('0' + (activeCheckbox + 1))
    })
    $('.slider-control-box').click(function(){
      var index = $(this).index()
      $('.one-slide-slick-slider').slick('slickGoTo', index)
    })
    $('.fade-slick-slider').slick(fadeSliderConfig)
    .on('afterChange', function(slick, currentSlideObj){
      var activeCheckbox = 0
      if(currentSlideObj.currentSlide) activeCheckbox = 1
      $('.slider-control-box.active').removeClass('active')
      $('.slider-control-box:eq(' + activeCheckbox + ')').addClass('active')
      $('.current-slide').html('0' + (activeCheckbox + 1))
    })
    $('.slider-control-box').click(function(){
      var index = $(this).index()
      $('.one-slide-slick-slider').slick('slickGoTo', index)
    })
  }
  $('.next-arrow').click(function(){
    $('.one-slide-slick-slider').slick('slickNext')
  })
  $('.img-preview').each(function(i, el){
    $(el).click(function(){
      $('.fade-slick-slider').slick('slickGoTo', i)
    })
  })
})

$(document).ready(function() { // Header slider module
  var timeout = null

  var $activeBox = $('.header-slider-control-box.active')
  var currentHeaderSlide = $activeBox.index() - 1
  var headerSlidesCount = $('.header-background').length -1

  var timeoutFunction = function(){
    if(currentHeaderSlide >= headerSlidesCount) currentHeaderSlide = 0
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