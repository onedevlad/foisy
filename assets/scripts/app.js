//@prepros-prepend common.js
//@prepros-prepend components/numbers-counter.js

var sliderConfig = Object.assign({}, defaultSliderConfig, {
  slidesToScroll: 4,
  slidesToShow: 4,
})

$(document).ready(function() { // Slick config module
  if(jQuery().slick) {
    $('.app-slider').slick(sliderConfig)
    .on('afterChange', function(slick, currentSlideObj){
      var activeCheckbox = currentSlideObj.currentSlide === 0 ? 0 : 1
      $('.slider-control-box.active').removeClass('active')
      $('.slider-control-box:eq(' + activeCheckbox + ')').addClass('active')
      $('.current-slide').html('0' + (activeCheckbox + 1))
    })
  }
})
