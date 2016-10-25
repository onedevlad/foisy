//@prepros-prepend common.js

//@prepros-prepend ../lib/slick/slick.min.js


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
  }
})